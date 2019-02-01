def app(environ, start_response):
    start_response('200 OK', [('Content-Type', 'text/html')])
    return [b'Hello, world!']

if __name__ == '__main__':
    try:
        from wsgiref.simple_server import make_server
        httpd = make_server('', 5000, app)
        print('Serving on port 5000...')
        httpd.serve_forever()
    except KeyboardInterrupt:
        print('Goodbye.')
