import os
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow


app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + \
    os.path.join(basedir, 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)


class Allergy(db.Model):
    __tablename__ = 'allergies'

    id = db.Column(db.Integer, primary_key=True)
    start = db.Column(db.String(100))
    stop = db.Column(db.String(100))
    patient = db.Column(db.String(100))
    encounter = db.Column(db.String(100))
    code = db.Column(db.Integer)
    description = db.Column(db.String(100))

    def __init__(self, start, stop, patient, encounter, code, description):
        self.start = start
        self.stop = stop
        self.patient = patient
        self.encounter = encounter
        self.code = code
        self.description = description


class AllergySchema(ma.Schema):
    class Meta:
        fields = ('id', 'start', 'stop', 'patient',
                  'encounter', 'code', 'description')


allergy_schema = AllergySchema()
allergies_schema = AllergySchema(many=True)


@app.route('/allergies', methods=['GET'])
def show_all_allergies():
    """
        GET http://127.0.0.1:5000/allergies/
    """
    all_prods = Allergy.query.all()
    res = allergies_schema.dump(all_prods)
    return jsonify(res)


@app.route('/allergies/<int:CODE>', methods=['GET'])
def show_specific_allergies(CODE):
    """
        GET http://127.0.0.1:5000/allergies/232350006
    """
    all_prods = Allergy.query.filter_by(code=CODE)
    res = allergies_schema.dump(all_prods)
    return jsonify(res)


if __name__ == "__main__":
    app.run(debug=True)
