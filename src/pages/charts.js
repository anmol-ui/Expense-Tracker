import { useState,useEffect,useRef } from "react";
import './charts.css';
import { createChart } from 'lightweight-charts';
import axios from 'axios';
import Grid from '@mui/material/Grid';

const symbols = ['INFY.BSE','RELIANCE.BSE','IBM','HDFC.BSE','TCS.BSE','HCLTECH.BSE','ITC.BSE','ADANIENT.BSE','TATAMOTORS.BSE','PAYTM.BSE'];
const stocks = ['INFOSYS','RELIANCE','IBM','HDFC','TCS','HCL','ITC','ADANI ENTERPRISES','TATA MOTORS','PAYTM'];

function Charts(){
    const chartContainerRef = useRef(null);
    const chartInstanceRef = useRef(null);

    const [activeTab, setActiveTab] = useState(symbols[0]);
    const [loading,setLoading] = useState(true);
    const [index,setIndex] = useState(0);

    const handleTabClick = (symbol) => {

      setActiveTab(symbol);
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
                console.log(data);
                updateChart(data);
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
          return ndata;
        };
    
        const updateChart = (data) => {
          if (chartInstanceRef.current) {
            const lineSeries = chartInstanceRef.current.addCandlestickSeries({
                upColor: '#26a69a', downColor: '#ef5350', borderVisible: false,
                wickUpColor: '#26a69a', wickDownColor: '#ef5350',
            });
            lineSeries.setData(data);
          }
        };
    
        // Create the chart instance
        chartInstanceRef.current = createChart(chartContainerRef.current, {
          width: 800,
          height: 400,
        });
    
        // Fetch data initially
        if(activeTab!==null){
          fetchData();
        }
    
        // Fetch data periodically every 5 minutes
        const fetchInterval = setInterval(fetchData, 5 * 60 * 1000);
    
        return () => {
          // Cleanup function
          clearInterval(fetchInterval);
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
              <h2>{stocks[index]} (BSE)</h2>
              {activeTab!==null && <div className="chart" ref={chartContainerRef} />}
              <p style={{marginLeft:'21%'}} class="paragraph-gap">For more detailed stock analysis checkout the <a href="https://www.tradingview.com/" title="Trading View">TradingView</a></p>   
              </div>
            </Grid>

            <Grid className="grid-bottom" item xs={12} sm={6} style={{marginTop:'2%'}}>
            <div className="vertical-tabs">
            <div className="tabs">
              {symbols.map((symbol,index)=>(
                <div className="stock"
                  onClick = {()=> {handleTabClick(symbol); setIndex(index)}}
                  key={index}
                ><span className="tab-label">{stocks[index]}</span>
                </div>
              ))}
            </div>
            </div>

            </Grid>
            </Grid>
        </div>
      </div>
    );
}

export default Charts;