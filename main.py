from flask import Flask, render_template, jsonify, request
import requests

#----- replacing path names -----#
old_path = "erbfnijerhuifjerhugojoergnenrg"
new_path = ""

from pathlib import Path

files = Path("templates").glob('*')
for filename in files:
    try:
        with open(f"{filename}", "r") as f:
            data = str(f.read())
            while old_path in data:
                data= data.replace(old_path, new_path)
        with open(f"{filename}", "w") as f:
            f.write(data)
    except Exception as e:
        print(e)
    print(f"Prepared file {filename}")


app = Flask("app",
            static_url_path='', 
            static_folder='templates',
            template_folder='templates')

@app.route('/')
def main():
    return render_template("/index.html", active=lambda x : "active" if x == "all" else "")

@app.route('/explore/projects/<tag>/')
def explore(tag):
    return render_template("/index.html", active=lambda x : "active" if x == tag else "")
    
@app.errorhandler(404)
def page_not_found(e):
    return "Error handler for 404", 404

@app.route('/api/<tag>/')
def api(tag):
    limit = request.args.get("limit")
    offset = request.args.get("offset")
    if limit is None:
        limit = 40
    if offset is None:
        offset = 0
    return jsonify(requests.get(
        f"https://se-sorter.1tim.repl.co/api/{tag}/?limit={limit}&offset={offset}"
    ).json())
    
app.run(host='0.0.0.0', port=8080)
