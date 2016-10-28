LinuxCNC2Websocket
==================

Installing on lucid/lcnc 2.5.3:

Only for the webserver which can run on any ubuntu/debian machine in the net. (even on the lcnc machine)

	sudo apt-get install python-cherrypy3
	
On both machines:

	sudo apt-get install python-ws4py

Clone the repository to the lcnc machine (ie. to the home dir).

Copy the lcnc_poslogger_cherrypy_server.py file to the machine which should act as a webserver and start it:

	python lcnc_poslogger_cherrypy_server.py
	
(lcnc_poslogger_cherrypy_server.py is the webserver).

Start linuxcnc.

cd to the cloned repository directory.
In a terminal start 

	python ws-pos-logger.py <webserver>   #(IP or hostname)

.

If there are no errors point the browser of your smartphone/tablet/pc etc
to the URL:

	http://<webserver>:9000

.

Enjoy :)

PS: you can connect as many browsers as you want simultaneously
