from flask import Flask, render_template, request
from flask_mysqldb import MySQL

app = Flask(__name__, static_folder='static')

app.config['MYSQL_HOST'] = "localhost"
app.config['MYSQL_USER'] = "root"
app.config['MYSQL_PASSWORD'] = "123456"
app.config['MYSQL_DB'] = "bd_mysql"

mysql = MySQL(app)

@app.route('/', methods=['GET', 'POST'])
def menu():
    if request.method == 'POST':
        return render_template('cadastro.html')
    else:
        return render_template('menu.html')

@app.route('/cadastro', methods=['GET', 'POST'])
def cadastro():
    if request.method == 'POST':
        nome = request.form['nome']
        matricula = request.form['matricula']
        cursor = mysql.connection.cursor()
        cursor.execute("INSERT INTO cadastro (aluno, matricula) VALUES (%s, %s)", (nome, matricula))
        mysql.connection.commit()
        cursor.close()
        return render_template('menu.html')
    else:
        return render_template('cadastro.html')


@app.route('/consultaAlunos', methods=['GET', 'POST'])
def consultaAlunos():
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM cadastro ORDER BY aluno ASC")
    alunos = cursor.fetchall()
    cursor.close()
    return render_template('consultaAlunos.html',  alunos=alunos)

@app.route('/alteraAlunos', methods=['GET', 'POST'])
def alteraAlunos():
    if request.method == 'POST':
        matricula = request.form['matricula']
        nomeAlterar = request.form['nomeAlterar']
        cursor = mysql.connection.cursor()
        cursor.execute("UPDATE cadastro SET aluno = %s WHERE matricula = %s", (nomeAlterar, matricula))
        mysql.connection.commit()
        cursor.close()
        return render_template('menu.html')
    else:
        return render_template('alteraAlunos.html')

@app.route('/deletaAlunos', methods=['GET','POST'])
def deletaAlunos():
    if request.method == 'POST':
        matricula = request.form.get('matricula')
        if matricula:
            cursor = mysql.connection.cursor()
            cursor.execute("DELETE FROM cadastro WHERE matricula = %s", (matricula,))
            mysql.connection.commit()
            cursor.close()
            return render_template('menu.html')
        else:
            return "Matrícula do aluno não fornecida."
    else:
        # Caso o método da requisição não seja POST, redirecionar para a página adequada
        return render_template('deletaAlunos.html')

if __name__ == '__main__':
    app.run(debug=True)