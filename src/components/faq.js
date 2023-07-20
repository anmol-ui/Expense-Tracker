import './faq.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Faq(){

    function openAnswer(e){
        let element = e.target;
        if(element.classList.contains('fas')){
            element = element.parentNode;
        }
        const q_num = (element.classList[1]);

        const ans_element = document.querySelector('.a.'+q_num);

        var isOpen = element.classList.contains('rotate');
        if(isOpen){
            element.classList.remove('rotate');
            ans_element.style.paddingTop = '0';
            ans_element.style.paddingBottom = '0';
            ans_element.style.maxHeight = '0';
        }
        else{
            element.classList.add('rotate');
            ans_element.style.padding = '20px';
            ans_element.style.maxHeight = (ans_element.scrollHeight+40) + 'px';
        }
    }

    return (
        <div className="faq">
             <div id="container">
                <h1>Questions? We've got you covered.</h1>
                <div class="title"><h3>General FAQs on Savings and Investments</h3></div>
                    <ul class="faq">
                        <li class="q one" onClick={(e) => openAnswer(e)}> What is the difference between savings and investments? <i class="fas fa-plus"></i></li>
                        <li class="a one">Savings refer to the money you set aside in a low-risk, easily accessible account, typically a savings account, to meet short-term goals or emergencies. On the other hand, investments involve putting your money into assets like stocks, bonds, real estate, or mutual funds with the expectation of earning a return over the long term.</li>
                        
                        <li class="q two" onClick={(e) => openAnswer(e)}> Why should I save money?<i class="fas fa-plus"></i></li>
                        <li class="a two">Saving money is essential because it provides a financial safety net for unexpected expenses or emergencies. It also allows you to achieve short-term financial goals and provides funds for planned purchases or investments.</li>
                    
                        <li class="q three" onClick={(e) => openAnswer(e)}> What are the different types of savings accounts available?<i class="fas fa-plus"></i></li>
                        <li class="a three">There are several types of savings accounts, including regular savings accounts, high-yield savings accounts, money market accounts, and certificates of deposit (CDs). Each type has different features and interest rates, so it's essential to choose one that aligns with your financial goals.</li>
                        
                        <li class="q four" onClick={(e) => openAnswer(e)}> How much of my income should I save?<i class="fas fa-plus"></i></li>
                        <li class="a four">Financial experts often recommend saving at least 10-20% of your income. However, the actual amount depends on your financial situation, goals, and expenses. The more you save, the better prepared you'll be for future financial needs and investments.</li>                   
                    
                        <li class="q five" onClick={(e) => openAnswer(e)}> What is compound interest, and why is it important for investments?<i class="fas fa-plus"></i></li>
                        <li class="a five">Compound interest is the interest earned on both the initial amount of money (the principal) and the accumulated interest from previous periods. It is crucial for investments because it allows your money to grow exponentially over time. The longer you stay invested, the more significant the impact of compound interest on your returns.</li>

                        <li class="q six" onClick={(e) => openAnswer(e)}>What are the different investment options available for beginners?<i class="fas fa-plus"></i></li>
                        <li class="a six"> For beginners, some common investment options include: <br></br><br></br>
                                        <span>Stocks:</span> Buying shares of a company's stock, representing ownership in the company. <br></br>
                                        <span>Bonds:</span> Lending money to a company or government in exchange for periodic interest payments. <br></br>
                                        <span>Mutual Funds:</span> Pooled funds from multiple investors, managed by professionals, diversified across various assets. <br></br>
                                        <span>Exchange-Traded Funds (ETFs):</span> Similar to mutual funds but traded on stock exchanges like individual stocks. <br></br>
                                        <span>Real Estate:</span> Investing in property or real estate investment trusts (REITs).</li>
                    
                        <li class="q seven" onClick={(e) => openAnswer(e)}>What is the recommended investment strategy for long-term growth?<i class="fas fa-plus"></i></li>
                        <li class="a seven">A common strategy for long-term growth is to create a diversified portfolio by investing in a mix of assets. Diversification helps spread risk and can include a combination of stocks, bonds, and other investment types. Regularly review and rebalance your portfolio based on your risk tolerance and financial goals.</li>

                        <li class="q eight" onClick={(e) => openAnswer(e)}>What is the difference between a Traditional IRA and a Roth IRA?<i class="fas fa-plus"></i></li>
                        <li class="a eight">Traditional IRA contributions are typically tax-deductible in the year you make them, but you pay taxes on withdrawals during retirement. Roth IRA contributions are not tax-deductible, but withdrawals are tax-free in retirement, provided you meet certain conditions. The choice between the two depends on your current tax situation and future expectations.</li>
                    </ul>
            </div>
        </div>
    );
}

export default Faq;