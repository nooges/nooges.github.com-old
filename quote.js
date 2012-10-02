<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js">
</script>

<script type='text/javascript'>
function main()
{
  var ticker = 'AAPL'
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
    $("#content").html(items.join(""));
  });
}

function quoteStr(last, change, time)
{
  if (change.charAt(0) == '+')
    fontColor = 'green'
  else if (change.charAt(0) == '-')
    fontColor = 'red'
  else
    fontColor = 'black'
  
  percentChange = Math.round(10000*+change/+last)/100
  output = last + " <b>Change:</b><font color=" + fontColor + "> "
  output += change + " (" + percentChange + "%)</font>"
  output += " (" + time + ")"
  return output
}

main();
</script>
