import os, sys
os.chdir(os.path.dirname(os.path.abspath(__file__)))
port = int(os.environ.get("PORT", 4200))
import http.server, socketserver
Handler = http.server.SimpleHTTPRequestHandler
with socketserver.TCPServer(("", port), Handler) as httpd:
    httpd.serve_forever()
