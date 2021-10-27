release: python server/manage.py migrate
web: sh -c 'cd ./server/ && gunicorn api.wsgi'