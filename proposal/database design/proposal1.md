# Data base design proposal

## Purpose

The purpose of this document is to review analyze the requirements in order to provide an easy to implement, robust, generalized, expendable model that can solve the requirements of the product

* Solve the client requirements
* Easy to implement
* Generalized, Robust and Expandable

## Client Requirements ( + optional expansions)

* As listed in the proposal
* All the data that can be collected from the users should be stored in a way that can be later presented as a data set feature, for data science use.
* Admin is able to specify for a given activity the subjects covered, so he can later filter by users that missed a specific subject.
* Support of creating activities outside of the section schedule, for example, to a different section / office times, that might covers subjects as well, being able to establish the covered subject in a alternative way.

## Proposal

### Objects

* User

  * Examples
    * Educators
    * Students
    * system admin
  * Properties
    * ID (?)
    * UID

* User Groups

  * Examples
    * Class students
    * Inner Group class
    * TAs
  * Properties
    * ID
    * array of Users and User Groups

* Event

  Events representing the definition of event that people can participate at 

  * Examples
    * Class meeting
    * Poll
  * Properties
    * ID
    * Creator
    * array of Event Properties

* Event Property

  Properties that defines the event

  * Examples
    * Description
    * Location
    * Type
    * Form
    * Covered materials
    * Permissions (?)
    * Audience
  * Properties
    * Event ID
    * Key
    * Value (type?  json/id with consraint)

* Event Participation

  Relation of Events to Users

  * Examples
    * Class attendance
    * Poll filling
    * Absence Excuse
  * Properties
    * Student ID
    * Event ID
    * Filled Properties 

* Events Aggregator

  * Example
    * Class
    * Section
  * Properties
    * ID
    * Creator
    * Array of Events and Events Aggregators

* Aggregator Property

  * Example
    * Name
    * 







