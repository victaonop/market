import styled from "styled-components";
import { Grid } from "@material-ui/core";

export const CustomPagination = styled(Grid)`
    position: relative;
    top: 15px;
    & .MuiPagination-ul {
        justify-content: center !important;
    }
`;

