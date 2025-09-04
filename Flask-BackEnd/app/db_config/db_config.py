import configparser

def read_db_config(filename='/Users/decagon/desktop/cafe_fausse_reservation/config.ini', section='database'):
    # Create a parser
    parser = configparser.ConfigParser()
    # Read the configuration file
    parser.read(filename)
    # Get section, default to database
    db = {}
    if parser.has_section(section):
        params = parser.items(section)
        for param in params:
            db[param[0]] = param[1]
    else:
        raise Exception(f'Section {section} not found in the {filename} file')
    return db