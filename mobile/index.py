#!/usr/bin/etc python

import sys

def printHtmlHeader():
  print '<html>'
  print '<head>'
  print '<title>Stock Quotes</title>'
  print '<meta name="viewport" content="width=device-width, initial-scale=1"> '
  print '<link rel="stylesheet" href="http://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min.css" />'
  print '<link rel="stylesheet" href="quotes.css" />'
  print '<script src="http://code.jquery.com/jquery-1.8.2.min.js"></script>'
  print '<script src="http://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min.js"></script>'
  print '<script src="quotetable.js"></script>'
  print '</head>'
  
  print '<body>'
  print '<div data-role="page">'
  print '  <div data-role="header">'
  print '    <h1>Stock Quotes</h1>'
  print '  </div><!-- /header -->'

  print '  <div data-role="content">'
  print '    <ul data-role="listview">'
  print '      <div id="stockquote"></div>'
  print '    </ul>'
  print '  </div><!-- /content -->'

  print '</div><!-- /page -->'
  print '</body>'
  print '</html>'

###################################
# Main routine
###################################
def main():
  sys.stderr = sys.stdout
  
  # Create HTML output
  printHtmlHeader()
  
if __name__ == '__main__':
  main()