from backend import app
from flask import jsonify

from .models import Allergy, allergy_schema, allergies_schema
from .models import Careplan, careplan_schema, careplans_schema
from .models import Condition, condition_schema, conditions_schema
from .models import Device, device_schema, devices_schema
from .models import Encounter, encounter_schema, encounters_schema


@app.route('/allergies', methods=['GET'])
def show_all_allergies():
    """
        GET -> /allergies
    """
    all_prods = Allergy.query.all()
    res = allergies_schema.dump(all_prods)
    return jsonify(res)


@app.route('/allergies/<int:CODE>', methods=['GET'])
def show_specific_allergies(CODE):
    """
        GET -> /allergies/232350006
    """
    all_prods = Allergy.query.filter_by(code=CODE)
    res = allergies_schema.dump(all_prods)
    return jsonify(res)


@app.route('/careplans', methods=['GET'])
def show_all_careplans():
    """
        GET -> /careplans
    """
    all_prods = Careplan.query.all()
    res = careplans_schema.dump(all_prods)
    return jsonify(res)


@app.route('/careplans/<id>', methods=['GET'])
def show_specific_careplans(id):
    """
        GET -> /careplans/d2500b8c-e830-433a-8b9d-368d30741520    
    """
    all_prods = Careplan.query.filter_by(id=id)
    res = careplans_schema.dump(all_prods)
    return jsonify(res)


@app.route('/conditions', methods=['GET'])
def show_all_conditions():
    """
        GET -> /conditions
    """
    all_prods = Condition.query.all()
    res = conditions_schema.dump(all_prods)
    return jsonify(res)


@app.route('/conditions/<id>', methods=['GET'])
def show_specific_conditions(id):
    """
        GET -> /conditions/56
    """
    all_prods = Condition.query.filter_by(id=id)
    res = condition_schema.dump(all_prods[0])
    return jsonify(res)


@app.route('/devices', methods=['GET'])
def show_all_device():
    """
        GET -> /devices
    """
    all_prods = Device.query.all()
    res = devices_schema.dump(all_prods)
    return jsonify(res)


@app.route('/devices/<int:id>', methods=['GET'])
def show_specific_devices(id):
    """
        GET -> /devices/12
    """
    all_prods = Device.query.filter_by(id=id)
    res = device_schema.dump(all_prods[0])
    return jsonify(res)


@app.route('/encounters', methods=['GET'])
def show_all_encounters():
    """
        GET -> /encounters
    """
    all_prods = Encounter.query.all()
    res = encounters_schema.dump(all_prods)
    return jsonify(res)


@app.route('/encounters/<id>', methods=['GET'])
def show_specific_encounters(id):
    """
        GET -> /encounters/9d35ec9f-352a-4629-92ef-38eae38437e7
    """
    all_prods = Encounter.query.filter_by(id=id)
    res = encounter_schema.dump(all_prods[0])
    return jsonify(res)
