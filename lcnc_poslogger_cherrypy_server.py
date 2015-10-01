#!/usr/bin/python
# -*- coding: UTF-8 -*-
#
import os.path
import cherrypy

from ws4py.server.cherrypyserver import WebSocketPlugin, WebSocketTool
from ws4py.websocket import WebSocket

class BroadcastWebSocketHandler(WebSocket):
    def received_message(self, m):
        cherrypy.engine.publish('websocket-broadcast', str(m))
        
class Root(object):
    @cherrypy.expose
    def index(self):
        host = cherrypy.request.headers['Host']
        return """<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8" />
      <title>WebSocket example broadcasting LinuxCNC status</title>
      <link rel="stylesheet" href="/css/style.css" type="text/css" />

      <script type="application/javascript" src="/js/jquery-1.7.1.min.js"> </script>
      <script type="application/javascript" src="/js/jcanvas.min.js"> </script>
      <script type="application/javascript" src="/js/lcncview.js"> </script>
      <script type="application/javascript">
        $(document).ready(function() {
          initWebSocket("%s");
          drawAll();
        });
      </script>
    </head>
    <body>
    <section id="content" class="body">
    <canvas id="canvas" width="900" height="620"></canvas>
    </section>
    </body>
    </html>
    """ % host

    @cherrypy.expose
    def ws(self):
        cherrypy.log("Handler created: %s" % repr(cherrypy.request.ws_handler))

if __name__ == '__main__':
    cherrypy.config.update({
        'server.socket_host': '0.0.0.0',
        'server.socket_port': 9000,
        'tools.staticdir.root': os.path.abspath(os.path.join(os.path.dirname(__file__), 'static'))
        }
    )
    print os.path.abspath(os.path.join(__file__, 'static'))
    WebSocketPlugin(cherrypy.engine).subscribe()
    cherrypy.tools.websocket = WebSocketTool()

    cherrypy.quickstart(Root(), '', config={
        '/js': {
            'tools.staticdir.on': True,
            'tools.staticdir.dir': 'js'
            },
        '/css': {
            'tools.staticdir.on': True,
            'tools.staticdir.dir': 'css'
            },
        '/images': {
            'tools.staticdir.on': True,
            'tools.staticdir.dir': 'images'
            },
        '/ws': {
            'tools.websocket.on': True,
            'tools.websocket.handler_cls': BroadcastWebSocketHandler
            }
        }
    )
