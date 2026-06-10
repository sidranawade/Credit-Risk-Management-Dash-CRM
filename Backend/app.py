from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('CredRisManDash_updated.html')

@app.route('/client-directory')
def client_directory():
    return render_template('Client_dir_updated.html')

@app.route('/client-dashboard')
def client_dashboard():
    return render_template('clientdasupdated1.html')

@app.route('/notifications')
def notifications():
    return render_template('notifications.html')

@app.route('/navbar')
def navbar():
    return render_template('CredRisMan_Navbar_Standalone.html')


if __name__ == '__main__':
    app.run(debug=True)
