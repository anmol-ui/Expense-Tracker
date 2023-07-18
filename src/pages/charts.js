import { useState,useEffect,useRef } from "react";
import './charts.css';
import { createChart } from 'lightweight-charts';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';

const symbols = ['INFY.BSE','RELIANCE.BSE','IBM','HDFC.BSE','TCS.BSE','HCLTECH.BSE','ITC.BSE','ADANIENT.BSE','TATAMOTORS.BSE','PAYTM.BSE'];
const stocks = ['INFOSYS','RELIANCE','IBM','HDFC','TCS','HCL','ITC','ADANI ENTERPRISES','TATA MOTORS','PAYTM'];
const percentages = [];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
function add_stocks_data(data){
  console.log('repeat')
  for(let i=0;i<data.length;i++){
    const inst = data[i];
    rows.push({symbol:inst.symbol,last:inst.last_price,change:inst.price_change,pchange:inst.percentage_change})
  }
}
axios({
  method : "GET",
  headers:{ "Access-Control-Allow-Origin": "https://expense-tracker-backend-two.vercel.app/"},
  url: `https://expense-tracker-backend-two.vercel.app/fetch_stocks_data`
}).then(res=>{
  //add this data to UI
  add_stocks_data(res.data);
}).catch(err=>{
  console.log("got error",err);
})

const rows = [];

function Charts(){
    axios({
      method : "GET",
      headers:{ "Access-Control-Allow-Origin": "https://expense-tracker-backend-two.vercel.app/"},
      url: `https://expense-tracker-backend-two.vercel.app/update_stocks`
    }).then(res=>{
      // console.log(res.data);
      //add this data to UI
      console.log(res.data);
    }).catch(err=>{
      console.log("got error",err);
    })
  
    const chartContainerRef = useRef(null);
    const chartInstanceRef = useRef(null);

    const [activeTab, setActiveTab] = useState(symbols[0]);
    const [loading,setLoading] = useState(true);
    const [index,setIndex] = useState(0);
    const [stockTitle,setStockTitle] = useState('INFOSYS');

    const handleTabClick = (symbol) => {

      setActiveTab(symbol);
      setStockTitle(stocks[symbols.indexOf(symbol)])
    };
    
    let scrollToSection = (e, sectionId) => {
      e.preventDefault();
  
      const targetSection = document.querySelector(sectionId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    };

    useEffect(() => {

        const fetchData = async () => {
          try {
            const response = await axios.get(
                'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol='+activeTab+'&outputsize=full&apikey=3NC5FRPGCGU5YIV3'
                );
            const data = formatData(response.data);
            if(typeof data[0] !== 'undefined'){
                updateChart(data[0],data[1]);
                setLoading(false);
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        const formatData = (rawData) => {
          // Format and transform the raw data into the required format for the chart
          // This depends on the specific data structure returned by the API
          // Example: extract the OHLC (Open, High, Low, Close) values from the response
          const timeSeriesData = rawData['Time Series (Daily)'];
          const ndata = [];
          const formattedData = Object.keys(timeSeriesData).map((timestamp) => {
            const time = timestamp;
            const { '1. open': open, '2. high': high, '3. low': low, '4. close': close } = timeSeriesData[timestamp];
            ndata.push({ time, open: +open, high: +high, low: +low, close: +close });
          });
          ndata.sort((a, b) => new Date(a.time) - new Date(b.time));

          const volData = [];
          Object.keys(timeSeriesData).map((timestamp) => {
            const time = timestamp;
            const { '6. volume': volume } = timeSeriesData[timestamp];
            const { '1. open': open,'4. close': close } = timeSeriesData[timestamp];
            if(+close<+open){
              volData.push({ time, value: +volume, color: 'rgba(255, 99, 132, 0.5)' });
            }
            else{
              volData.push({ time, value: +volume });
            }
          });
          volData.sort((a, b) => new Date(a.time) - new Date(b.time));

          return [ndata,volData];
        };
    
        const updateChart = (data,volData) => {
          if (chartInstanceRef.current) {
            const lineSeries = chartInstanceRef.current.addCandlestickSeries({
                upColor: '#26a69a', downColor: '#ef5350', borderVisible: false,
                wickUpColor: '#26a69a', wickDownColor: '#ef5350',
            });
            lineSeries.setData(data);

            const volSeries = chartInstanceRef.current.addHistogramSeries({
              color: 'rgba(38, 166, 154, 0.5)',
              priceFormat: {
                type: 'volume',
              },
              priceScaleId: 'left',
              autoScale: false
            });
            volSeries.setData(volData);
          }
        };
    
        // Create the chart instance
        chartInstanceRef.current = createChart(chartContainerRef.current, {
          width: 800,
          height: 400,
          leftPriceScale: {
            scaleMargins: {
              top: 0.8,
              bottom: 0,
            },
          },
        });
    
        // Fetch data initially
        if(activeTab!==null){
          fetchData();
        }
    
        // Fetch data periodically every 5 minutes
        // const fetchInterval = setInterval(fetchData, 5 * 60 * 1000);
    
        return () => {
          // Cleanup function
          // clearInterval(fetchInterval);
          if (chartInstanceRef.current) {
            chartInstanceRef.current.remove();
            chartInstanceRef.current = null;
          }
        };
      }, [activeTab]);

    return (
      <div className="charts-root">
        <div className="bgImage"></div>
        <div className="charts-header">
          <h1 style={{color:'white'}}>LEARN BEFORE INVESTING</h1>
          <h1 style={{color:'yellow'}}>START CHARTING.</h1>
          <p style={{color:'white'}}>Charts provide valuable insights and help make informed investment decisions.</p>
          <p style={{color:'white',lineHeight:'134%'}}> Visual representation of historical price data, patterns, and trends of various financial instruments such as stocks, commodities, or currencies can help you Identify Patterns, Analyze Market Trends, Plan Risk Management and potentially improve investment outcomes.</p>
          <a href="#main-content" onClick={(e) => scrollToSection(e, '#main-content')}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          VIEW CHARTS
          </a>
        </div>
        <div class="main-content" id="main-content">
            <h1>Live Stock Chart</h1>
            <p style={{margin:'4% 0'}}>A collection of Top Blue Chip stocks of India. These stocks are carefully picked considering the current market condition and economy. They have a strong history of high and consistent returns. However, it should be noted that any financial decision must be taken after thoroughly researching and consulting with your financial advisor.</p>
            
            <hr style={{borderTopWidth:'6px', maxWidth:'4rem',borderRadius:'50px'}}></hr>
            <Grid container spacing={10}>

            <Grid item xs={12} sm={6} style={{marginTop:'2%'}}>
              <div className="chart-content">
              <h2>{stockTitle} (BSE)</h2>
              {activeTab!==null && <div className="chart" ref={chartContainerRef} />}
              <p style={{marginLeft:'21%'}} class="paragraph-gap">For more detailed stock analysis checkout the <a href="https://www.tradingview.com/" title="Trading View">TradingView</a></p>   
              </div>
            </Grid>

            <Grid className="grid-bottom" item xs={12} sm={6} style={{marginTop:'1%'}}>
            <div className="vertical-tabs">
            {/* <div className="tabs">
              {symbols.map((symbol,index)=>(
                <div className="stock"
                  onClick = {()=> {handleTabClick(symbol); setIndex(index)}}
                  key={index}
                ><span className="tab-label">{stocks[index]}</span>
                </div>
              ))}
            </div> */}
            <TableContainer style={{maxHeight:'28rem'}} component={Paper}>
              <Table sx={{ minWidth: 400 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell style={{width:'0%'}} align="left">Symbol</StyledTableCell>
                    <StyledTableCell style={{width:'0%'}} align="center">Last</StyledTableCell>
                    <StyledTableCell style={{width:'0%'}} align="center">Change&nbsp;</StyledTableCell>
                    <StyledTableCell style={{width:'0%'}} align="center">Change%&nbsp;</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <StyledTableRow key={row.name} onClick={(e)=>{handleTabClick(row.symbol);}}>
                      <StyledTableCell style={{width:'0%',fontWeight:'500'}} component="th" scope="row">
                        {row.symbol}
                      </StyledTableCell>
                      <StyledTableCell style={{width:'0%',fontWeight:'500'}} align="center">{row.last}</StyledTableCell>
                      <StyledTableCell style={{width:'0%'}} align="center">{row.change}</StyledTableCell>
                      <StyledTableCell style={{width:'0%'}} align="center">{row.change>0 ? <FontAwesomeIcon style={{color:'green'}} icon={faCaretUp} /> : <FontAwesomeIcon style={{color:'red'}} icon={faCaretDown} />} &nbsp; {row.pchange}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            </div>

            </Grid>
            </Grid>
        </div>
      </div>
    );
}

export default Charts;