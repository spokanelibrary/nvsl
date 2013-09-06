nvsl
====

SPL HIP NoveList Display Customizations


What is this and how do I use it?
-------------------------

* This will pull title/author/series suggestions into the
 left-hand column of a bib record, tab the other panels,
 and apply a few styles.

* You will need to have Ebsco modify your default display
 template for title/author/series to a single column. 

* See the config section of spl-hip-nvsl.js to customize color, etc.

* Search the SPL fullnonmarcbib.xsl for the string SPL-CONFIG.

* Be sure to set the full public URL to this file
 as well as your NoveList client id and password.

* A link to the raw .js on github is provided for testing but
 you are probably better off hosting your own.

* I'm not sure I can distribute fullnonmarcbib.xsl. You can contact me
 or talk to Brad at Ebsco and he might be able to help you out.

* You can search fullnonmarcbib for -sg to see all of the spl modifications.
There aren't that many.


Notes 
-------------------------

There is no docready block around splInitNoveList() 
since it is called from an Ebsco-supplied callback function.

At SPL we go ahead and load our own copy of jQuery 
since we need it anyway but this script uses pure js 
and then relies on the copy loaded by NoveList (if no $ detected).

Let me know if you decide to implement these customizations.
I won't hold it against you if you don't; you will just have to live with yourself.

