import mysql.connector as mc

try:
    connector = mc.connect(host = 'localhost', database = 'test', user = 'root', password = '')
    cursor = connector.cursor()

    request = "INSERT INTO `user` (`name`, `lastname`) VALUES ('Dorian', 'PILLARD')"
    cursor.execute(request)

    connector.commit()

    # userList = cursor.fetchall()

    # for user in userList:
    #     print('Name : {}'.format(user[0]))

except mc.Error as err:
    print(err)

finally:
    if(connector.is_connected()):
        cursor.close()
        connector.close()