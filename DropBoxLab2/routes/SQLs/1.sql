SELECT * FROM group WHERE GID IN (SELECT GID FROM usergroup WHERE UID = 
(SELECT username FROM user WHERE UID = 0)
);