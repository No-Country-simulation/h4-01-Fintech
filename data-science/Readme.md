#

## virtualenv

´´´bash
python3 -m venv venv
´´´

linux:

´´´bash
source venv/bin/activate
´´´

Windows:

´´´bash
.\venv\Scripts\activate

´´´

### comando usados , solo se usan una sola vez

$ python -m pip install Django

chmod a+x build.sh

python -m gunicorn fintech.asgi:application -k uvicorn.workers.UvicornWorker
