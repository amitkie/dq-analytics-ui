// import React from "react";
// import Pagination from "react-bootstrap/Pagination";

// function PaginationComponent() {
//   return (
//     <div>
//       <Pagination>
//         <Pagination.First />
//         <Pagination.Prev />
//         <Pagination.Item active>{1}</Pagination.Item>
//         <Pagination.Ellipsis />

//         <Pagination.Item>{10}</Pagination.Item>
//         <Pagination.Item>{11}</Pagination.Item>
//         <Pagination.Item>{12}</Pagination.Item>
//         <Pagination.Item>{13}</Pagination.Item>
//         <Pagination.Item disabled>{14}</Pagination.Item>

//         <Pagination.Ellipsis />
//         <Pagination.Item>{20}</Pagination.Item>
//         <Pagination.Next />
//         <Pagination.Last />
//       </Pagination>
//     </div>
//   );
// }

// export default PaginationComponent;

import React from "react";
import Pagination from "react-bootstrap/Pagination";

function PaginationComponent({ totalPages, currentPage, onPageChange }) {
  const handleClick = (pageNumber) => {
    if (pageNumber !== currentPage) {
      onPageChange(pageNumber);
    }
  };

  const paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => handleClick(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <Pagination>
      <Pagination.First onClick={() => handleClick(1)} />
      <Pagination.Prev
        onClick={() => handleClick(currentPage > 1 ? currentPage - 1 : 1)}
      />
      {paginationItems}
      <Pagination.Next
        onClick={() =>
          handleClick(currentPage < totalPages ? currentPage + 1 : totalPages)
        }
      />
      <Pagination.Last onClick={() => handleClick(totalPages)} />
    </Pagination>
  );
}

export default PaginationComponent;
