import Grid from '@material-ui/core/Grid';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { connect, useSelector } from 'react-redux';
import CloseButton from '../CloseButton/CloseButton';
import Paper from '@material-ui/core/Paper';
import HoverItem from '../../Inventory/HoverItem/HoverItem';
import DoubleInventory from '../../Inventory/DoubleInventory/DoubleInventory';
import SingleInventory from '../../Inventory/SingleInventory/SingleInventory';
import DropInventory from '../../DropInventory/DropInventory';

const useStyles = makeStyles(theme => ({
  outsideDiv: {
    width: '90vw',
    position: 'absolute',
    height: '80vh',
    margin: 'auto',
    overflow: 'hidden',
    right: 0,
    left: 0,
    bottom: 0,
    top: 0,
    zIndex: -1,
    '@global': {
      '*::-webkit-scrollbar': {
        width: 10,
        marginLeft: theme.spacing(1),
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
      },
      '*::-webkit-scrollbar-track': {
        boxShadow: 'inset 0 0 1px grey',
        borderRadius: 10,
      },
      '*::-webkit-scrollbar-thumb': {
        background: grey[500],
        borderRadius: 10,
        '&:hover': {
          background: grey[700],
        },
      },
    },
  },
  insideDiv: {
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
    display: 'block',
    zIndex: -1,
  },
  paper: {
    width: '100%',
    height: '100%',
    position: 'relative',
    zIndex: -1,
  },
}));

export default connect()(function AppScreen(props) {
  const classes = useStyles();
  const invType = useSelector(state => state.inventory.inventoryShow);
  const [inv, setInv] = useState(<SingleInventory/>);
  useEffect(() => {
    switch (invType) {
      case "drop" :
        setInv(<DropInventory/>);
        break;
      default:
        setInv(<SingleInventory/>);
    }
  }, [invType]);

  return (
    <Grid style={{ visibility: props.hidden ? 'hidden' : 'visible' }} className={classes.outsideDiv}>
      <HoverItem/>
      <Grid container className={classes.insideDiv} justify={'center'}>
        <Paper className={classes.paper}>
          {inv}
        </Paper>
        <CloseButton/>
      </Grid>
    </Grid>
  );
});
