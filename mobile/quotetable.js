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
  $("ul").listview("refresh");
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
      items.push('<li><a href="#"><div class="ui-grid-b">');
      items.push('<div class="ui-block-a" style="width:30%">' + item.t + "<br><font size=1>" + shortName(item.name) + "</font></div>");    // Ticker symbol
      items.push('<div class="ui-block-b" style="width:25%">' + item.l + "<br><font size=1>" + item.ltt.split(' ')[0] + "</font></div>");    // Last price & time
      items.push('<div class="ui-block-c" style="width:45%"><font color=' + changeColor(item.c) + ">");  // Change color
      items.push(item.c + " (" + item.cp + "%)</font><br>");      // Change
      items.push("<font size=1>" + item.lo + " - " + item.hi + "</font></div>");      // Range
      items.push("</div></a></li>");

      if (item.hasOwnProperty("el"))
      {
        items.push('<li><div class="ui-grid-b">');
        items.push('<div class="ui-block-a" style="width:30%">&nbsp;</div>');    // Ticker symbol
        items.push('<div class="ui-block-b" style="width:25%">' + item.el + "<br><font size=1>" + item.elt.split(' ')[2] + "</font></div>");    // Last price & time
        items.push('<div class="ui-block-c" style="width:45%"><font color=' + changeColor(item.ec) + ">");  // Change color
        items.push(item.ec + " (" + item.ecp + "%)</font><br>");      // Change
        items.push("</div></li>");
      } 
        
        
      /*
      if (item.avvo === "")
      {
        items.push("<td>" + item.vo + "</td>");    // Volume
      }
      else
      {
        items.push("<td>" + item.vo + "/" + item.avvo + "</td>");    // Volume
      }
      items.push("<td>" + item.lt + "</td>");                      // Last time
      items.push("</tr>");

      if (item.hasOwnProperty("el"))
      {
        extHours = true;
        items.push("<tr>");
        items.push("<td></td>");    // Ticker symbol
        items.push("<td>" + item.el + "</td>");    // Last price
        items.push("<td><font color=" + changeColor(item.ec) + ">");  // Change color
        items.push(item.ec + " (" + item.ecp + "%)</font></td>");      // Change
        items.push("<td></td>");      // Range
        items.push("<td></td>");    // Volume
        items.push("<td>" + item.elt + "</td>");                      // Last time
        items.push("</tr>");
      }
      */
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

printQuote('AAPL,GOOG,AMZN,UCO,SPY');
