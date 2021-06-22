import styled from "styled-components";
import { Grid } from "@material-ui/core";

export const SettingsGrid = styled(Grid)`
  background-color: #e9e9e9;
  padding: 28px 28px 0;
  margin: 30px 0;

  .amount__Button{
    cursor: pointer;
  }
  
  .section {
    font-weight: 300;
    color: #5d5d5d;
    margin-top: 10px;
  }

  > div {
    &:first-child {
      padding: 0 !important;
    }
  }

  .MuiToolbar-regular {
    min-height: 0px;
  }
  
  .grid-container {
    margin: 0 30px;
    padding: 0 0 15px 0;
  }

  .button-container {
    max-height: 36px;
  }

  .filter-box {
    margin: 30px 0;
    background-color: #fafafa;
    padding: 16px;
    padding-left: 24px;
    .search-button {
      margin-right: 20px;
      color: #fff;
      &:hover {
        background-color: #d4e6f2;
        opacity: 0.8;
      }
    }
  }

  .MuiPaper-elevation2 {
    box-shadow: unset;
  }

  .MuiTableCell-root {
    /* &:hover {
      color:#d4e6f2;
    }
    > span:hover {
      color:#d4e6f2;
    }
    > div:hover {
      color:#d4e6f2;
    } */
    > div {
      .MuiIconButton-root {
        background: transparent !important;
        box-shadow: none !important;
      }
      button {
        .MuiTouchRipple-root {
          display: none !important;
        }
        cursor: pointer;
        box-shadow: none !important;
      }
    }
  }

  .material-icons { inline-size: auto !important; line-height: inherit !important; }

  .MuiTableSortLabel-root.MuiTableSortLabel-active {
    color: white;
  }

  .MuiTableFooter-root {
    display: none !important; 
  }

  .MuiButtonBase-root {
    /* >span :hover {
      color: #d4e6f2;
    }
    >div :hover {
      color: #d4e6f2;
    } */
  }

  .material-icons {
    color: white;
    > div :hover {
      color:#d4e6f2;
    }
    > span {
      color:white;
    }
  }

  .MuiTableHead-root {
    tr {
      th {
        background-color: black;
        color: white;
        font-size: 16px;
        font-weight: bold;
        /* > div:hover {
          background-color: #d4e6f2;
        } */
        padding: 0px 16px;
        height: 40px;

        :first-child {
          border-top-left-radius: 6px;
        }
        :last-child {
        border-top-right-radius: 6px;
          > div {
            justify-content: flex-end;
            text-align: right !important;
          }
        }
      }
    }
  }

  .MuiTableBody-root {
    tr {
      color: #717171;

      td {
        font-size: 15px !important;
        height: 45px !important;
        padding: 0px 15px !important;

        :first-child {
          text-align: left;
        }


        > div p {
          margin: 0px;
          font-size: 13px;
          font-style: italic;
        }
        :last-child {
          padding: 0px !important;
          > div {
            justify-content: flex-end;
            text-align: right !important;
          }
        }
      }
    }
  }

  .MuiIconButton-root {
    padding: 0px !important;
  }

  .submit-container {
    margin: 20px 0;
    padding-right: 16px;
    > :first-child {
      margin-right: 10px;
    }
  }

  @media screen and (max-width: 1200px) {
    .create-title {
      width: 100%;
      margin-top: 30px;
    }
  }
`;
