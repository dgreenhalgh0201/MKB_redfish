from flask import Flask, request, jsonify
import redfish

app = Flask(__name__)


@app.route('/api/set_bios_options', methods=['POST'])
def set_bios_options():
    data = request.get_json()
    uefi_boot_mode = data.get('uefi_boot_mode', False)
    date_time = data.get('date_time', False)
    reset_rom = data.get('reset_rom', False)
    base_url = data.get('url', False)
    username = data.get('username', False)
    password = data.get('password', False)
    gen = data.get('gen', False)
    make = data.get('make', False)

    redfish_client = redfish.redfish_client(base_url, username, password)

    # Connect to the Redfish API
    redfish_client.login()

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
