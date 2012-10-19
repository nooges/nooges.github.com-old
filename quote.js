var timeout = 2000;
var tid;

function quoteStr(last, change, time)
{
switch (change.charAt(0))
{
  case '+':
    fontColor = 'green';
    break;
  case '-':
    fontColor = 'red';
    break;
  default:
    fontColor = 'black';
}

  percentChange = Math.round(10000*+change/+last)/100;
  output = last + " <b>Change:</b> <font color=" + fontColor + ">";
  output += change + " (" + percentChange + "%)</font>";
  output += " (" + time + ")";
  return output;
}
    
function printQuote()
{
  var d = new Date();
  var n = d.toTimeString();
  var ticker = 'AAPL';
  var url = 'http://www.google.com/finance/info?infotype=infoquoteall&q=' + ticker + '&callback=?';
  $.getJSON(url, function(data)
  {
    var items = [];
    $.each(data, function(key, datum)
    {
      items.push("<center><table border=1><tr><td><font size=3><center>");
      output = quoteStr(datum.l, datum.c, datum.lt);
      items.push("<b>" + datum.name + " (" + datum.t + ")</b> " + output);
      if (datum.hasOwnProperty("el"))
      {
         output = quoteStr(datum.el, datum.ec, datum.elt);
         items.push("<br><b>Extended Hours:</b> " + output);
      }
      items.push("<br><b>Range:</b> " + datum.lo + '-' + datum.hi);
      items.push(" <b>Volume/Average:</b> " + datum.vo + "/" + datum.avvo);
      //items.push("<br>" + n);
    });
    printVXAPL(items);
  });
  tid = setTimeout(printQuote, timeout);
}

function printVXAPL(items)
{
  var d = new Date();
  var n = d.toTimeString();
  var url = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22%5EVXAPL%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=?';
  $.getJSON(url, function(data)
  {
    $.each(data.query.results, function(key, datum)
    {
      items.push("<br>");
      output = quoteStr(datum.LastTradePriceOnly, datum.Change, datum.LastTradeTime);
      items.push("<b>" + datum.symbol + "</b> " + output);
      items.push(" <b>Range:</b> " + datum.DaysLow + '-' + datum.DaysHigh);
      items.push("</center></font></td></tr></table></center>");
    });
    $("#stockquote").html(items.join(""));
  });
}

// To be called when you want to stop the timer
function abortTimer()
{
  clearInterval(tid);
}

printQuote();