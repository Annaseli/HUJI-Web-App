Full-Stack Website Development from Requirements to Production
===========

### Authors: Anna Seliverstov and Matan Chen

-----------------------------------------------------------

Website URL: https://huji-innovate-app-7419c.firebaseapp.com

Website Demo Video: https://clipchamp.com/watch/06yAEBWXvDA

------------------------------------------------------------

### Description:

The website is intended for rooms reservations for the Hebrew University of Jerusalem innovate Center 
for members of the Center only.

The functionality that the site has:
* The website is designed to be compatible with both web app and mobile views.
* The registration to the site is for members of the Center only. The admin has to approve the users, 
  and when he approves them, he adds a user type to each user. 
  There are 3 user types according to their role in the center: member, team and admin.
* Log in.
* Log out.
* Forgot Password page.  
* About US page. 
* Report a Problem page. 
* Provide users with the ability to view their reservations, including the option to sort them by
  date, time, room, reservation ID, and number of invited people.
* Delete a reservations.
* Room Reservation Process:
  1. Display the available rooms based on the user type and current month's availability. Each user 
     type has a specific list of rooms that they can reserve.
  2. The user enters the number of participants, and available rooms and dates are displayed 
     accordingly.
  4. After selecting the desired date and consecutive hours, the system displays available rooms 
     and starting hours, beginning from which the requested number of consecutive hours is 
     available. If no appropriate room or start time is available, the user is prompted to change 
     the date or reduce the number of consecutive hours.
  5. The user chooses the starting hour and is presented with available rooms.
  6. After selecting a room, the user is shown a summary of the reservation, and they confirm 
     the reservation.
* Adding reservations to Google or Apple calendar.
* Check In - The user enters a code that is unique to the room. The system searches for a reservation
  in the user's reservation list that is scheduled to occur around the check-in time. If a matching
  reservation is found with the same room code, the check-in process is completed and the user is
  informed. Otherwise, if no suitable reservation is found, the system informs the user that no 
  reservationwas found.
* Additional functionality for the administrator:
  Only accessible by the admin, this menu includes the following options:
  1. View and delete users from the system.
  2. Download an Excel file of all reservations for a specific year and month.
  3. Approve or reject pending user requests.
  4. Edit room details.
  5. Retrieve a list of all problem reports submitted by users and delete them.

### My Work Progress:

1.	Got a requirements document from the head of HUJI-innovate center Dr. Amnon Dekel.
2.	Had meetings with him as a client to understand the requirements.
3.	Searched on-line for technologies and tools that I should use and learn for building the website.
4.	Learned the best practices and the ideal site-building techniques that are required for the project.
5.	Learned from scratch React, HTML, CSS, Firebase, JavaScript and Node.js using Udemy courses and by researching on-line.
6.	Enhanced my knowledge in SQL and JSON based NoSQL databases.
7.	Constructed the system architecture in the shared google doc: 
  •	Wrote the architecture based on a SQL database and on a JSON NoSQL database for considering the best option for the project.
  •	Wrote APIs for the backend and frontend interface.
  •	Wrote an elaborated flow for each functionality on the website while referring to the usage of the SQL DB architecture and the NoSQL DB architecture.
  •	Decided which technologies, frameworks, database, and techniques to use.
8.	Implemented the backend side and tested the functionality. 
9.	Implemented part of the frontend side and tested the functionality.
10.	Collaborated with Matan Chen using GitHub who was responsible for the rest of the frontend side.
11.	Integrated the backend and the frontend functionality – fixed the interface code between them and fixed bugs that occurred during the integration.
12.	Tested the website as a whole project.
13.	Deployed an alpha stage of production of the website.

### Architecture and Technology:

* Frontend Language: JavaScript, HTML, CSS
* Frontend framework: React
* Backend Language and Environment: JavaScript, Node.js.
* Backend framework (Service): Firebase
* Database: JSON based NoSQL firestore real time database.
