var timeout = 2000;
var tid;

function changeColor(change)
{
  var fontColor;
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

  return fontColor;
}

function writeHtml(items, extHours)
{
  var header = "";
  header += "<font size=3><center><table>";
  header += "<tr><th></th>";
  header += "<th>Current</th>";
  header += "<th>Change</th>";
  header += "<th>Range</th>";
  header += "<th>Volume/Avg</th>";
  header += "<th>Time</th>";

  var footer = "</table></center></font>";
  header = '<ul data-role="listview" data-inset="true">';
  footer = '</ul>';
  //header = '';
  //footer = '';
  $("ul").empty();
  $("ul").append(items.join(""));
}

function shortName(name)
{
  if (name.length > 10)
    name = name.substring(0, 10) + '...';
  return name;
}

function printQuote(tickers)
{
  //var d = new Date();
  //var n = d.toTimeString();
  var url = 'http://www.google.com/finance/info?infotype=infoquoteall&q=' + tickers + '&callback=?';
  var items = [];
  var quotes = [];
  var extHours = false;
  $.getJSON(url, function(data)
  {
    $.each(data, function(key, item)
    {
      items.push('<li class="table-view-cell"><table width="100%"><tr>');
      items.push('<td width="30%">' + item.t + "<br><p>" + shortName(item.name) + "</p></td>");    // Ticker symbol
      items.push('<td width="25%">' + item.l + "<br><p>" + item.ltt.split(' ')[0] + "</p></td>");    // Last price & time
      items.push('<td width="45%"><font color=' + changeColor(item.c) + ">");  // Change color
      items.push(item.c + " (" + item.cp + "%)</font><br>");      // Change
      items.push("<p>" + item.lo + " - " + item.hi + "</p></td>");      // Range
      items.push("</tr></table></li>");

      if (item.hasOwnProperty("el"))
      {
        items.push('<li class="table-view-cell"><table width="100%"><tr>');
        items.push('<td width="30%">&nbsp;</td>');    // Ticker symbol
        items.push('<td width="25%">' + item.el + "<br><p>" + item.elt.split(' ')[2] + "</p></td>");    // Last price & time
        items.push('<td width="45%"><font color=' + changeColor(item.ec) + ">");  // Change color
        items.push(item.ec + " (" + item.ecp + "%)</font></td>");      // Change
        items.push("</tr></table></li>");
      } 
    });
    writeHtml(items, extHours);
  });
  tid = setTimeout(function() {printQuote(tickers);}, timeout);
}

// To be called when you want to stop the timer
function abortTimer()
{
  clearInterval(tid);
}

// Read in tickers from URL if specified
var url = $.url();
var tickers = url.param('stocks');
if (tickers === undefined)
  tickers = 'AAPL,GOOG,AMZN,UCO,SPY';
printQuote(tickers);
