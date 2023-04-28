import {
  ContentBox,
  Table,
  SortWrapper,
  SortLabel,
  PaginationWrapper,
  PageButton
} from "../styles/styledElements";
import { useState, useEffect } from "react";
import Layout from "../layouts/Layout";
import * as adminApi from "../apis/adminApi";

export default function DailyRecordPage() {
  const [content, setContent] = useState([]);
  const [sortByNewest, setSortByNewest] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  useEffect(() => {
    const fetchAllRecord = async () => {
      const res = await adminApi.getAllRecord();
      // console.log(res.data?.record, "---content---");
      setContent(res.data?.record);
    };
    fetchAllRecord();
  }, []);

  // Sort
  const handleSortChange = event => {
    setSortByNewest(event.target.value === "newest");
  };
  const sortedContent = content.slice().sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortByNewest ? dateB - dateA : dateA - dateB;
  });

  // Pagination
  const totalPages = Math.ceil(
    sortedContent.length / itemsPerPage
  );
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedContent.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const onPageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  return (
    <Layout>
      <ContentBox>
        <SortWrapper>
          <SortLabel htmlFor="sort-select">
            Sort by:
          </SortLabel>
          <select
            id="sort-select"
            value={sortByNewest ? "newest" : "oldest"}
            onChange={handleSortChange}>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </SortWrapper>
        <PaginationWrapper>
          {pageNumbers.map(number => (
            <PageButton
              key={number}
              active={number === currentPage}
              onClick={() => onPageChange(number)}>
              {number}
            </PageButton>
          ))}
        </PaginationWrapper>
        <Table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Height(cm)</th>
              <th>Weight(kg)</th>
              <th>Waist(inch)</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((e, id) => (
              <tr key={id}>
                <td>
                  {new Date(e.date).toLocaleDateString()}
                </td>
                <td>
                  {e.User
                    ? `${e.User.firstName} ${e.User.lastName}`
                    : ""}
                </td>
                <td>{e.height}</td>
                <td>{e.weight}</td>
                <td>{e.waist}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ContentBox>
    </Layout>
  );
}
