package com.createainstyle.ainstyle_backend.service;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

@Service
public class CrawlingService {

    private static final Logger logger = LoggerFactory.getLogger(CrawlingService.class);

    public List<String> getImageLinks(String styleType, String gender) {
        // 크롬 드라이버 경로 설정
        System.setProperty("webdriver.chrome.driver", "C:\\Users\\Asusvivobook\\Desktop\\chromedriver-win64\\chromedriver.exe");

        ChromeOptions options = new ChromeOptions();
        options.addArguments("--start-maximized");
        options.addArguments("--headless"); // 무언 모드로 설정하여 브라우저를 백그라운드에서 실행합니다.

        WebDriver driver = new ChromeDriver(options);
        List<String> imageSrcs = new ArrayList<>();

        try {
            // gender에 따라 M 또는 F로 변경
            logger.info("Received gender: " + gender);
            String genderParam = ("M".equalsIgnoreCase(gender) || "남성".equalsIgnoreCase(gender)) ? "M" : "F";
            logger.info("Gender parameter for URL: " + genderParam);

            String url = "https://www.musinsa.com/app/styles/lists?use_yn_360=&style_type=" + styleType + "&brand=&tag_no=&display_cnt=60&list_kind=big&sort=NEWEST&page=1&_gf=" + genderParam;
            logger.info("크롤링할 URL: " + url);
            driver.get(url);

            // WebDriverWait를 사용하여 요소가 나타날 때까지 기다립니다.
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(20)); // 타임아웃을 20초로 연장
            wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//img[contains(@class, 'style-list-thumbnail__img')]")));

            List<WebElement> images = driver.findElements(By.xpath("//img[contains(@class, 'style-list-thumbnail__img')]"));

            for (WebElement img : images) {
                String src = img.getAttribute("data-original");

                if (src == null || src.isEmpty()) {
                    src = img.getAttribute("src");
                }

                if (!src.startsWith("http")) {
                    src = "https:" + src;
                }
                imageSrcs.add(src);
            }
            logger.info("크롤링된 이미지 수: " + imageSrcs.size());
        } catch (Exception e) {
            logger.error("크롤링 중 오류 발생", e);
        } finally {
            driver.quit();
        }

        return imageSrcs;
    }
}