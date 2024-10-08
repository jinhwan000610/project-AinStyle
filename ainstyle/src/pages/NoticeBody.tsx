import React, { useState } from 'react';
import './NoticeBody.css';

interface Notice {
  id: number;
  title: string;
  content: string;
  date: string;
  author: string;
}

const notices: Notice[] = [
  { id: 1, title: "공지사항", content: "첫 번째 공지사항의 내용입니다.", date: "2024-03-16", author: "관리자" },
  { id: 2, title: "게시판 이용 안내", content: "두 번째 공지사항의 내용입니다.", date: "2024-04-24", author: "관리자" },
  { id: 3, title: "세 번째 공지사항", content: "세 번째 공지사항의 내용입니다.", date: "2024-05-14", author: "관리자" },
  { id: 4, title: "네 번째 공지사항", content: "네 번째 공지사항의 내용입니다.", date: "2024-06-14", author: "관리자" },
  { id: 5, title: "다섯 번째 공지사항", content: "다섯 번째 공지사항의 내용입니다.", date: "2024-07-14", author: "관리자" },
  { id: 6, title: "여섯 번째 공지사항", content: "여섯 번째 공지사항의 내용입니다.", date: "2024-08-14", author: "관리자" },
  { id: 7, title: "일곱 번째 공지사항", content: "일곱 번째 공지사항의 내용입니다.", date: "2024-09-14", author: "관리자" },
  { id: 8, title: "여덟 번째 공지사항", content: "여덟 번째 공지사항의 내용입니다.", date: "2024-10-14", author: "관리자" },
  { id: 9, title: "아홉 번째 공지사항", content: "아홉 번째 공지사항의 내용입니다.", date: "2024-11-14", author: "관리자" },
  { id: 10, title: "열 번째 공지사항", content: "열 번째 공지사항의 내용입니다.", date: "2024-12-14", author: "관리자" },
  { id: 11, title: "열한 번째 공지사항", content: "열한 번째 공지사항의 내용입니다.", date: "2025-01-14", author: "관리자" },
];

const NoticeBody: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [searchField, setSearchField] = useState('title');
  const [searchDate, setSearchDate] = useState('');
  const [filteredNotices, setFilteredNotices] = useState<Notice[]>(notices);
  const [currentPage, setCurrentPage] = useState(1);
  const noticesPerPage = 10;

  const handleSearch = () => {
    const filtered = notices.filter(notice => {
      const searchInField = notice[searchField as keyof Notice].toString().toLowerCase();
      const searchMatch = searchInField.includes(searchText.toLowerCase());
      const dateMatch = searchDate ? notice.date === searchDate : true;
      return searchMatch && dateMatch;
    });
    setFilteredNotices(filtered);
    setCurrentPage(1); // 검색 시 첫 페이지로 초기화
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastNotice = currentPage * noticesPerPage;
  const indexOfFirstNotice = indexOfLastNotice - noticesPerPage;
  const currentNotices = filteredNotices.slice(indexOfFirstNotice, indexOfLastNotice);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredNotices.length / noticesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="NoticeBoard">
      <div className="NoticeTitle">
        Notice
      </div>
      <table className="NoticeTable">
        <thead>
          <tr>
            <th className="colNo">No.</th>
            <th className="colTitle">TITLE</th>
            <th className="colAuthor">Post by</th>
            <th className="colDate">DATE</th>
          </tr>
        </thead>
        <tbody>
          {currentNotices.map((notice, index) => (
            <tr key={notice.id} className="NoticeItem">
              <td className="colNo">{indexOfFirstNotice + index + 1}</td>
              <td className="colTitle">{notice.title}</td>
              <td className="colAuthor">{notice.author}</td>
              <td className="colDate">{notice.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="SearchContainer">
        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          className="SearchDate"
        />
        <select
          value={searchField}
          onChange={(e) => setSearchField(e.target.value)}
          className="SearchSelect"
        >
          <option value="title">제목</option>
          <option value="author">작성자</option>
          <option value="content">내용</option>
        </select>
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="SearchInput"
          placeholder="Search..."
        />
        <button onClick={handleSearch} className="SearchButton">검색</button>
      </div>


      <div className="Pagination">
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={(e) => handleClick(e, number)}
            className={number === currentPage ? 'active' : ''}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
}

export default NoticeBody;
