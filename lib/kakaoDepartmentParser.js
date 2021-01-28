const departmentParser = (name) => {
  switch (name) {
    case '컴퓨터공학과':
      return 1;
    case '소프트웨어학과':
      return 2;
    case '정보보호학과':
      return 3;
    case '데이터사이언스학과':
      return 4;
    case '디자인이노베이션':
      return 5;
    case '만화애니메이션텍':
      return 6;
    case '스마트기기공학전공':
      return 7;
    case '무인이동체공학전공':
      return 8;
    case '인공지능학과':
      return 9;
    case '공통':
      return 11;
    default:
      return 10;
  }
};

module.exports.departmentParser = departmentParser;
