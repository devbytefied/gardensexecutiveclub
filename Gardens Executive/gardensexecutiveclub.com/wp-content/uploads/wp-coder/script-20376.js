 var _gaq = _gaq || [];

    // use jquery if it's available
   if( window.jQuery != null ) { 
      jQuery.getScript(gaJsHost + "google-analytics.com/ga.js", function(){
          try {
              if( window.console ) window.console.log("Google Analytics : Through jQuery logged");
              
              _gaq.push(['_setAccount', 'UA-2821686-8']);
              _gaq.push(['_trackPageview', 'Calendar : Month View']);

          }
          catch(err) {
              if( window.console ) window.console.log("Google Analytics : Through jQuery : Error");
          }
       });
   }
   else {
	   document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
       try {
          if (typeof(_gat) == 'object'){
            var pageTracker = _gat._getTracker("UA-2821686-8");
            if( window.console ) window.console.log("Google Analytics : Regular JS logged");
            pageTracker._trackPageview('Calendar : Month View');
          }
       }
       catch(err) {
           if( window.console ) window.console.log("Google Analytics : Regular JS : Error");

       }
   }

window.NREUM||(NREUM={});NREUM.info={"errorBeacon":"bam-cell.nr-data.net","licenseKey":"5ab79a9e36","agent":"","beacon":"bam-cell.nr-data.net","applicationTime":9,"applicationID":"1759696","transactionName":"Y1MHYRBUCBJZBRJfW1oZL2YyGgoAQQkTQmsEBlBTAVQKBFYCB0RrBAZQUwBUFQQWDBVG","queueTime":0}