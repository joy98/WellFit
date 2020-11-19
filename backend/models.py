from backend import ma, db


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


class Careplan(db.Model):
    __tablename__ = 'careplans'

    id = db.Column(db.String(100), primary_key=True)
    start = db.Column(db.String(100))
    stop = db.Column(db.String(100))
    patient = db.Column(db.String(100))
    encounter = db.Column(db.String(100))
    code = db.Column(db.Integer)
    description = db.Column(db.String(100))
    reasoncode = db.Column(db.String(100))
    reasondescription = db.Column(db.String(100))

    def __init__(self, start, stop, patient, encounter, code, description, reasoncode, reasondescription):
        self.start = start
        self.stop = stop
        self.patient = patient
        self.encounter = encounter
        self.code = code
        self.description = description
        self.reasoncode = reasoncode
        self.reasondescription = reasondescription


class CareplanSchema(ma.Schema):
    class Meta:
        fields = ('id', 'start', 'stop', 'patient', 'encounter',
                  'code', 'description', 'reasoncode', 'reasondescription')


class Condition(db.Model):
    __tablename__ = 'conditions'

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


class ConditionSchema(ma.Schema):
    class Meta:
        fields = ('id', 'start', 'stop', 'patient',
                  'encounter', 'code', 'description')


class Device(db.Model):
    __tablename__ = 'devices'

    id = db.Column(db.Integer, primary_key=True)
    start = db.Column(db.String(100))
    stop = db.Column(db.String(100))
    patient = db.Column(db.String(100))
    encounter = db.Column(db.String(100))
    code = db.Column(db.Integer)
    description = db.Column(db.String(100))
    udi = db.Column(db.String(250))

    def __init__(self, start, stop, patient, encounter, code, description, udi):
        self.start = start
        self.stop = stop
        self.patient = patient
        self.encounter = encounter
        self.code = code
        self.description = description
        self.udi = udi


class DeviceSchema(ma.Schema):
    class Meta:
        fields = ('id', 'start', 'stop', 'patient',
                  'encounter', 'code', 'description', 'udi')


class Encounter(db.Model):
    __tablename__ = 'encounters'

    id = db.Column(db.String(100), primary_key=True)
    start = db.Column(db.String(100))
    stop = db.Column(db.String(100))
    patient = db.Column(db.String(100))
    organization = db.Column(db.String(100))
    provider = db.Column(db.String(100))
    payer = db.Column(db.String(100))
    encounterclass = db.Column(db.String(100))
    code = db.Column(db.Integer)
    description = db.Column(db.String(100))
    base_encounter_cost = db.Column(db.String(100))
    total_claim_cost = db.Column(db.String(100))
    payer_coverage = db.Column(db.String(100))
    reasoncode = db.Column(db.String(100))
    reasondescription = db.Column(db.String(100))

    def __init__(self, start, stop, patient, organization, provider, payer, encounterclass, code, description, base_encounter_cost, total_claim_cost, payer_coverage, reasoncode, reasondescription):
        self.start = start
        self.stop = stop
        self.patient = patient
        self.organization = organization
        self.provider = provider
        self.payer = payer
        self.encounterclass = encounterclass
        self.code = code
        self.description = description
        self.base_encounter_cost = base_encounter_cost
        self.total_claim_cost = total_claim_cost
        self.payer_coverage = payer_coverage
        self.reasoncode = reasoncode
        self.reasondescription = reasondescription


class EncounterSchema(ma.Schema):
    class Meta:
        fields = ('id', 'start', 'stop', 'patient', 'organization', 'provider', 'payer', 'encounterclass', 'code',
                  'description', 'base_encounter_cost', 'total_claim_cost', 'payer_coverage', 'reasoncode', 'reasondescription')


allergy_schema = AllergySchema()
allergies_schema = AllergySchema(many=True)

careplan_schema = CareplanSchema()
careplans_schema = CareplanSchema(many=True)

condition_schema = ConditionSchema()
conditions_schema = ConditionSchema(many=True)

device_schema = DeviceSchema()
devices_schema = DeviceSchema(many=True)


encounter_schema = EncounterSchema()
encounters_schema = EncounterSchema(many=True)
