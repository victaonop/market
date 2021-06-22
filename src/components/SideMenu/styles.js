import styled from "styled-components";
import ListItem from "@material-ui/core/ListItem";
import { Paper, ListItemIcon, ListItemText } from "@material-ui/core";
import List from '@material-ui/core/List';

export const MenuList = styled(List)`
   background-color: #e9e9e9;
   border-radius: 15px;
`;

export const ListSubItem = styled(ListItem)`
  &.MuiListItem-root {
    /* background: #eee; */
    margin-bottom: 3px;
    border-left-style: solid;
    border-width: 5px;
  }

  &.MuiListItem-button:hover {
    text-decoration: none;
    color: #ffffff;
    border-color: #ffffff;
  }

  &.makeStyles-nested-213 {
    padding-left: 11px;
  }
`;

export const ListItemIconMenu = styled(ListItemIcon)`
  &.MuiListItemIcon-root {
    font-size: 20px;
    display: inline-flex;
    min-width: 42px;
    flex-shrink: 0;
  }

  &.MuiListItemIcon-root:hover {
    font-size: 20px;
    color: #ffffff;
    display: inline-flex;
    min-width: 42px;
    flex-shrink: 0;
  }
`;

export const ListItemTextMenu = styled(ListItemText)`
  /* >span {
        font-size: "15px";
        color: #878787;
        :hover {
            color: #FFFFFF;
        }
    } */
`;
