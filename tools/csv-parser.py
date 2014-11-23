#!/usr/bin/python
import sys, re, os, random, csv, json

def parse_age(age):
    if age == "20 and under":
        return random.randint(17, 20)
    return random.randint(21, 28)

def parse_subject(subj):
    # Y Combined sciences
    # Y Combined arts
    # Y Social sciences combined with arts
    # "Z General, other combined & unknown"
    # Y Sciences combined with social sciences or arts
    # Group A Medicine & Dentistry
    # Group B Subjects allied to Medicine
    # Group C Biological Sciences
    # "Group D Vet Sci,Ag & related"
    # Group F Physical Sciences
    # Group G Mathematical Sciences
    # Group H Engineering
    # Group I Computer Sciences
    # Group J Technologies
    # "Group K Architecture,Build & Plan"
    # Group L Social Studies
    # Group M Law
    # Group N Business & Admin studies
    # Group P Mass Comms and Documentation
    # "Group Q Linguistics, Classics & related"
    # "Group R European Langs, Lit & related"
    # "Group T Non-European Langs, Lit and related"
    # Group V Hist & Philosophical studies
    # Group W Creative Arts & Design
    # Group X Education
    # Y Combined social sciences
    if subj == "Y Combined sciences":
        return "Biology and Chemistry"
    elif subj == "Y Combined arts":
        return "Ceramics and Street Painting"
    elif subj == "Y Social sciences combined with arts":
        return "Psychology and Painting"
    elif subj == "Z General, other combined & unknown":
        return "Horse Raising"
    elif subj == "Y Sciences combined with social sciences or arts":
        return "Chemistry and Politics"
    elif subj == "Group A Medicine & Dentistry":
        return "Tooth Doctor School"
    elif subj == "Group B Subjects allied to Medicine":
        return "Tooth Doctor Helpers"
    elif subj == "Group C Biological Sciences":
        return "Biology"
    elif subj == "Group D Vet Sci,Ag & related":
        return "Corn Husbandry"
    elif subj == "Group F Physical Sciences":
        return "Geology"
    elif subj == "Group G Mathematical Sciences":
        return "Discrete Mathematics and Mathematical Reasoning"
    elif subj == "Group H Engineering":
        return "Electrical Engineering"
    elif subj == "Group I Computer Sciences":
        return "Comp Ski"
    elif subj == "Group J Technologies":
        return "Browsing Facebook"
    elif subj == "Group K Architecture,Build & Plan":
        return "Tram Building"
    elif subj == "Group L Social Studies":
        return "Thinking about people"
    elif subj == "Group M Law":
        return "Law"
    elif subj == "Group N Business & Admin studies":
        return "HR"
    elif subj == "Group P Mass Comms and Documentation":
        return "Mass Communication"
    elif subj == "Group Q Linguistics, Classics & related":
        return "Greek and/or Latin"
    elif subj == "Group R European Langs, Lit & related":
        return "European Languages"
    elif subj == "Group T Non-European Langs, Lit and related":
        return "Not European Languages"
    elif subj == "Group V Hist & Philosophical studies":
        return "History"
    elif subj == "Group W Creative Arts & Design":
        return "Being Creative"
    elif subj == "Group X Education":
        return "Teacher"
    elif subj == "Y Combined social sciences":
        return "International Geopolotics and perceptive politisciences"
    else:
        print "Fail!" + subj
        sys.exit(0)

objects = []
with open('inter_v2_13 (1).csv', 'rb') as csvfile:
    lines = csv.reader(csvfile, delimiter=',', quotechar='"')
    for line in lines:
        if not len(line) < 15:
            domicile_code, applicant_country, uni_country, jacs3_subj_grp, sex, age, deg_choices, found_deg_choices, hnd_choices, other_choices, deg_accepts, found_deg_accepts, hnd_accepts, other_accepts, choices_total, accepts_total = line
            if not (applicant_country == "England" or applicant_country == "Scotland" or applicant_country == "Wales" or applicant_country == "Northern Ireland") and not (deg_accepts == '-' or deg_choices == "-" or deg_accepts == "-" or len(deg_accepts) < 1):
                for z in xrange(int(deg_accepts)):
                    entry = {"gender": sex, "age": parse_age(age), "nationality": applicant_country, "year": 2013, "subject": parse_subject(jacs3_subj_grp), "accepted": True}
                    objects.append(entry)
                for z in xrange(int(deg_choices) - int(deg_accepts)):
                    entry = {"gender": sex, "age": parse_age(age), "nationality": applicant_country, "year": 2013, "subject": parse_subject(jacs3_subj_grp), "accepted": False}
                    objects.append(entry)

with open('junk.json', 'w') as of:
    json.dump(objects, of, indent=4)