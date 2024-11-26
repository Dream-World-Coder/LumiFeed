here the database features and actions are described.

    Collection:
        many to many relationship(m:n) with both User and Article

        --with-user:
        * add_collection: we can add a collection through the /add_collection route.
        if the collection already exist then we just link it with the user,
        we can see all users who are using that collection by: collection.users_who_own_it.all()
        [and for users: user.collections.all()]
        ALSO, when we create an new user, the Read Later and Liked Articles are linked to them by default.
        so no dupliaction and perfectly optimised

        * delete_collection: we can add a collection through the /delete_collection route.
        if many users are using that collection name then we just remove the relationship the user who deleted it.
        [user.collectios.remove()]
        and if only the current user is using that collection, then alongside removing the
        relationship, the collection itself is also deleted.

        Read Later and Liked Articles are non deletable.

        also all successful changes [like add or delete collections] are reflected real time with JS. no reload required.

        --with-article:
        --have to check what happens to the articles when a common collection is deleted form one user.
