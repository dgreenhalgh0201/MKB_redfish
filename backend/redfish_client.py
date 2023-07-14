from flask import Flask, request, jsonify
from flask_cors import CORS
import redfish


app = Flask(__name__)
CORS(app)

@app.route('/api/set_bios_options', methods=['POST'])
def set_bios_options():
    data = request.get_json()
    uefi_boot_mode = data.get('uefi_boot_mode', False)
    date_time = data.get('date_time', False)
    reset_rom = data.get('reset_rom', False)
    loginIP = data.get('url', False)
    user = data.get('username', False)
    pw = data.get('password', False)
    gen = data.get('gen', False)
    make = data.get('make', False)

    print(data)

    redfish_obj= redfish.redfish_client(base_url=loginIP, username =  user, password = pw)

    # Connect to the Redfish API
    redfish_obj.login(auth = "session")

    if make == 'DELL':
        if uefi_boot_mode:
            set_uefi_DELL(gen)

        if date_time:
            set_date_time_DELL(gen)

        if reset_rom:
            set_rom_DELL(gen)

    else:
        if uefi_boot_mode:
            set_uefi_HP(gen)

    if date_time:
        set_date_time_HP(gen)

    if reset_rom:
        set_rom_HP(gen)

    # Disconnect from the Redfish API
    redfish_client.logout()

    return jsonify({'message': 'BIOS options set successfully'})


if __name__ == '__main__':
    app.run()
