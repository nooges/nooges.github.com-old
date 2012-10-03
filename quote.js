function printQuote()
{
  var ticker = 'AAPL';
  var url = 'http://www.google.com/finance/info?infotype=infoquoteall&q=' + ticker + '&callback=?';
  $.getJSON(url, function(data) {
    var items = [];
    $.each(data, function(key, datum) {
      items.push("<center><table border=2><tr><td><font size=3><center>");
      output = quoteStr(datum.l, datum.c, datum.lt)
      items.push("<b>" + datum.name + " (" + datum.t + ")</b> " + output);
      if (datum.hasOwnProperty("el"))
      {
        output = quoteStr(datum.el, datum.ec, datum.elt)
        items.push("<br><b>Extended Hours:</b> " + output);
      }
      items.push("<br><b>Range:</b> " + datum.lo + '-' + datum.hi)
      items.push(" <b>Volume/Average:</b> " + datum.vo + "/" + datum.avvo)
      items.push("</center></font></td></tr></table></center>");
    });
    $("#stockquote").html(items.join(""));
  });
}

function quoteStr(last, change, time)
{
  switch (change.charAt(0))
  {
    case '+':
      fontColor = 'green'
      imgCode = '<img src="http://nooges.github.com/arrow-up.png"> '
      break
    case '-':
      fontColor = 'red'
      imgCode = '<img src="http://nooges.github.com/arrow-down.png"> '
      break
    default:
      fontColor = 'black'
      imgCode = ''
  }

  percentChange = Math.round(10000*+change/+last)/100
  output = last + " <b>Change:</b><font color=" + fontColor + ">"
  output += change + " " + imgCode + " (" + percentChange + "%)</font>"
  output += " (" + time + ")"
  return output
}

printQuote();
