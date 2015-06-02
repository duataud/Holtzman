###

  Apollos.name

  @example get a string with the name of this system

    console.log Apollos.name

###
Apollos.name = "Apollos"

###

  Apollos.user

  @example get the currently logged in user

    console.log Apollos.user()._id

###
Apollos.user = ->

  user = Meteor.user()
  return user or {}


Apollos.user.login = {}

###

  Apollos.person

  @example get the currently logged in user's person document

    console.log "Hello, #{Apollos.person().firstName}"

###
Apollos.person = (user) ->

  user or= Apollos.user()

  if user.guid
    person = Apollos.people.findOne
      guid: user.guid

  return person or {}




if Meteor.server
  Accounts.onCreateUser (options, user) ->
    if options.profile
      user.profile = options.profile

    if user.profile?.guest isnt true

      user.guid = Apollos.utilities.makeNewGuid()

      person = Apollos.person user
      # # no existing user so create one
      if not Object.keys(person).length
        Apollos.people.upsert({guid: user.guid}, {
          $set:
            preferredEmail: user.emails[0].address
        })




    return user

###

  Apollos.user.create

  @example create a new user

    Apollos.user.create "xyz@abc.cc", "password1", (error) ->
      if error
        console.log error

  @param email is the email address for the user to use to login with
  @param password is the plain-text password the user will authenticate with
  @param callback is the function that will be called with an error if so

###
Apollos.user.create = (email, password, callback) ->

  Accounts.createUser
    email: email
    password: password
  ,
    callback

###

  Apollos.user.forgotPassword

  @example request a forgot password email

    Apollos.user.forgotPassword "xyz@abc.cc", (error) ->
      if error
        console.log error

  @param email is the email address for the user to use to login with
  @param callback is the function that will be called with an error if so

###
Apollos.user.forgotPassword = (email, callback) ->

  return Accounts.forgotPassword
    email: email
  ,
    callback

###

  Apollos.user.resetPassword

  @example changes password using reset token

    Apollos.user.resetPassword token, newPassword, (error) ->
      if error
        console.log error

  @param token is the reset token emailed to the user
  @param newPassword is what to change the password to
  @param callback is the function that will be called with an error if so

###
Apollos.user.resetPassword = (token, newPassword, callback) ->

  return Accounts.resetPassword token, newPassword, callback

if Meteor.isServer
  # TODO this is not secure
  Apollos.emailTemplates = Accounts.emailTemplates