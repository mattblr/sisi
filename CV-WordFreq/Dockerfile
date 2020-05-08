FROM python:3.7.3
ADD . /app
WORKDIR /app
COPY requirements.txt ./
RUN pip install -r requirements.txt
COPY . /app

CMD ["python", "coronavirusSpeechAnalyzer.py"] 