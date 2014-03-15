# UPT Prototype

* Intended to calculate and estimate potential privacy risks in user agents through HTML5 APIs

# HOWTO get this APP runing

* Setup an Apache Server with PHP and MySQL
* Create the Database and table as instructed in sql/import.sql file (you can delete the test data included in it if you wish)
* Open the file /js/conf/conf.js and edit the Base Uri. Set the path to where UPT is stored
* Open indx.html in your browser and you're ready to roll!


# How do I add new Tests

* Write the Test 
** You can simply copy any existing test 
** set the name
** define affected spheres 
** define user agent behaviour
** define in the run method the test condition
* Add your test name to the config, found in /js/conf/config.js


# Configuration

* All configation can be done in /js/conf/conf.js
* User agent specific tests can be adjustet in every test separately
** All possible configuration options for user agents are listed in the BaseTest Model



# My user agent is not recognized (correctly)

* Open up UserAgent.js
* Adjust dataBrowser, dataOS and platforms
** you can add your user agent name to the list and specifiy which substring has to be searched for
* you are also free to add your own browser detect implementation as long as the public API remains the same