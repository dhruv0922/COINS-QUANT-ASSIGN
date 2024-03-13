Warning: Import all necessary items specified at the top of the jupyter notebook. Be sure to already have app.js running before starting the jupyter notebook. To start the app.js, enter node app.js into your terminal (you must have node installed).

The purpose of this delta hedging tool is to take an option from the user and formulate a delta value that is monitored for any changes. The program then notifies the user, when to buy or sell a specific amount of the option to keep the position delta neutral. 
Delta Hedging is a risk management strategy used in options trading to reduce or eliminate the risk associated with changes in the price of the underlying asset. With options trading, the "delta" of the option measures the rate of change for the options price with respect to changes in the price of the underlying asset. In simpler terms, the delta measures how much the option price is going to change for every dollar that changes in the underlying asset's price. If the delta is 0.5, then a dollar increase in the underlying would increase the options value by 0.5 dollars. 

	The program starts by taking in four inputs, the options symbol, the amount of that contract that the user wants to call or put, and the user’s email address, and a threshold value of the delta for adjusting the position. The program then extracts information from the options symbol in order to store things like the ticker, underlying price, the dates of the options, the strike price, and whether it is a call or a put.



The getIV() function retrieves the option chain for a given ticker symbol (tickerSymbol), and if the option is a call option (callOrPut == 'C'), it retrieves call options using op.get_calls(tickerSymbol), otherwise, it retrieves put options using op.get_puts(tickerSymbol).

The program continues by creating a boolean mask to filter out the rows where the strike price matches the given strike. Next, it selects the first matching row and retrieves the value from the 11th column which represents the implied volatility. This value is then stored in volPercent, with the final line being the return statement of that value without the percent sign.

Overall, the function getIV() fetches the implied volatility for an option with a specific strike price. It does so by retrieving the option chain, filtering for the option with the matching strike price, and extracting the implied volatility value from the corresponding row.

In order to get the interest rates for the treasury yield curve rates, the code webscapes US Treasury Yield Rates from the CNBC website in order to ensure we are working with the latest treasury yield rates. The code utilized when web-scraping is very specific to the website being used, as the code goes to the actual html code behind the website and takes the values from the yields column of the US Treasury Bonds chart.

—----------------------------------------------------------–
The value of an options contract is a function of 5 primary components: underlying asset price, strike price of option, interest rate, volatility, and time till expiration. 


For calculating the delta value we used the Black-Sholes formula. The variables in the code are represented as follows: 

S: Current price of the underlying asset (example: stock price)
K: Strike price of the option
r: Risk-free interest rate, assumed to be constant until the option's expiration
T: Time till the option expires
vol: Volatility of the underlying asset's returns, typically annualized

Here is an broken down explanation of what the actual formula does:

(math.log(S/K)) -> This part calculates the natural logarithm of the ratio of the current price of the underlying asset. This shows the relationship between the current price of the underlying asset and the strike price.

(T * (r + math.pow(vol, 2) / 2)): This part calculates the time value of the option, which reflects the effect of time and volatility on the option's price.

(vol * math.sqrt(T)): This part calculates the volatility value of the option, which reflects the sensitivity of the option's price to changes in volatility.

Creating and calculating the delta value everytime is not the best idea (there are better, more complex models being used by larger institutions that can estimate the value of a contract better), but we hope that if this idea is implemented further, we can simply access the delta values using an API.

—------------------------------------------------------------

After getting the delta value, we check if the value is greater than or less than 0. If it is less than 0, we send a message to the user through the console to buy a certain amount of shares, and we call the buySellUnderlying function, and if it is more than 0, we send a message to the console to sell a certain amount of shares, and call the buySellUnderlying function. For our program, the adjustment of the option position is based on the delta from the underlying value, which is always considered to be one. When the actual stock price moves, the delta provides guidance on whether to buy or sell a corresponding number of contracts to offset that change in the market.

buySellUnderlying: This function appends the buy or sell call made into an array called history that stores all of the calls to the function, basically logs each adjustment being made. The function then uses the amount variable in order to send an email to the user, reminding them to adjust their position by the specified amount. This is done through a javascript program called app.js, which should already be running before running this jupyter notebook. The program then makes a post request to the server, which is running on a local host to send an email to the email specified by the user at the start of the program. 

app.js walk through: 

This program sets up a server using Express. The server listens for POST requests to an endpoint or email. When it receives the post request, it checks the request body for recipients, a subject, and a body. Once it receives the request, it calls a function sendMail() to handle the email sending process. sendMail() prepares the email using Nodemailer, by setting up the email transporter with Gmail's SMTP settings, it specifies the recipients, subject, and body of the email, and then sends the email to the specified recipient.

If an error occurs during the email sending process, the program logs the error to the console and throws an error to be caught by the calling function.

The server stays running on the local host of 3000 until stopped by the user, meaning that requests can be sent over a long period of time, without interference, unless required and done by the user.

After sending the email, the program then calculates the entire overall trading position of the option being traded accounting for the delta, the number of shares, and the number of contracts.

—------------------------------------------------------------


This code reports how much of the underlying you should buy or sell initially so that the delta can start at a neutral position before it is monitored by the program for the user.

The final cell of code in the jupyter notebook simulates using the entire delta hedging tool by continuously changing the current date and price of underlying. The current date is changed until it equals the contract's maturity (if there are 10 days till maturity, the loop will run 10 times). The price of the stock is varied by adding a random number between -10 and 10 to the price. 

The Black-Scholes formula relies on a perceived drift in the price (tendency for the price to move in a certain direction), so using a random number to vary the price defeats the purpose of using Black-Scholes. We continue to use a random number generator despite this because it is much easier to implement and serves its purpose well enough to simulate the tool. 

After each day in the market, one adjustment is made. The code outputs if you should buy or sell, and also emails the user a notification for the amount of shares you should buy or sell. 




