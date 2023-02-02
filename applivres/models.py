## Models permet de definir les données de l appm


from .app import db
from flask_login import UserMixin
from .app import login_manager

class Author(db.Model):
    id = db.Column(db.Integer, primary_key =True)
    name = db.Column(db.String(100))
    def __repr__(self):
        return "<Author (%d) %s>" % (self.id, self.name)
class Book(db.Model ):
    id = db.Column(db.Integer, primary_key =True)
    price = db.Column(db.Float)
    title = db.Column(db.String(500))
    url = db.Column(db.String(200))
    img = db.Column(db.String(100))
    # relation pour avoir les auteurs d un livre
    author_id = db.Column(db.Integer, db.ForeignKey("author.id"))
    # relation inverse pour avoir les livres d un auteur
    author = db.relationship("Author",
        backref=db.backref("books", lazy="dynamic"))
    def __repr__ (self ):
        return "<Book (%d) %s>" % (self.id, self.title)

class Genre(db.Model):
    id = db.Column(db.Integer, primary_key =True)
    name = db.Column(db.String(100))
    def get_id(self):
        return self.id
    def __repr__(self):
        return "<Genre (%d) %s>" % (self.id,self.name)
class BookGenre(db.Model):
    __tablename__ = "book_genre"
    id= db.Column(db.Integer, primary_key=True)
    book_id = db.Column(db.Integer, db.ForeignKey("book.id"), primary_key=True)
    genre_id = db.Column(db.Integer, db.ForeignKey("genre.id"), primary_key=True)
    book = db.relationship(Book, backref=db.backref("books", cascade="all, delete-orphan"),overlaps="book,genre")
    genre = db.relationship(Genre, backref=db.backref("genres", cascade="all, delete-orphan"),overlaps="book,genre")

class User(db.Model , UserMixin ):
    username = db.Column(db.String(50) , primary_key=True)
    password = db.Column(db.String(64))
    def get_id(self):
        return self.username
    def __repr__(self):
        return "<User (%s)>" % (self.username)

class Favorite(db.Model):
    __tablename__ = "favorite"
    id_fav = db.Column(db.Integer, primary_key=True)
    user_id_fav = db.Column(db.String(50), db.ForeignKey("user.username"), primary_key=True)
    book_id_fav = db.Column(db.Integer, db.ForeignKey("book.id"), primary_key=True)
    user_fav = db.relationship(User, backref=db.backref("users_fav", cascade="all, delete-orphan"),overlaps="user,book")
    book_fav = db.relationship(Book, backref=db.backref("books_fav", cascade="all, delete-orphan"),overlaps="user,book")

class Rate(db.Model):
    __tablename__ = "rate"
    id_rate = db.Column(db.Integer, primary_key=True)
    user_id_rate = db.Column(db.String(50), db.ForeignKey("user.username"), primary_key=True)
    book_id_rate = db.Column(db.Integer, db.ForeignKey("book.id"), primary_key=True)
    rate = db.Column(db.Integer)
    user_rate = db.relationship(User, backref=db.backref("users_rate", cascade="all, delete-orphan"),overlaps="user,book")
    book_rate = db.relationship(Book, backref=db.backref("books_rate", cascade="all, delete-orphan"),overlaps="user,book")
    def __repr__(self):
        return "<Rate (%d)>" % (self.id)
def get_book(id):
    return Book.query.get(id)
def get_books():
    return Book.query.order_by(Book.title).all()
def get_books_sample(nb_by_page, page):
    return Book.query.order_by(Book.title).all()[nb_by_page*(page-1):nb_by_page*page]
def get_books_sample_filtered(page,author,genre,price_min,price_max,order,asc):
    query = Book.query.join(Author).join(BookGenre).join(Genre)
    if author :
        query = query.filter(Author.name.like("%"+author+"%"))
    if genre :
        query = query.filter(Genre.name.like("%"+genre+"%"))
    if price_min :
        query = query.filter(Book.price>=price_min)
    if price_max :
        query = query.filter(Book.price<=price_max)
    if order == "title":
        if asc:
            query = query.order_by(Book.title.asc())
        else:
            query = query.order_by(Book.title.desc())
    elif order == "price":
        if asc:
            query = query.order_by(Book.price.asc())
        else:
            query = query.order_by(Book.price.desc())
    elif order == "author":
        if asc:
            query = query.order_by(Author.name.asc())
        else:
            query = query.order_by(Author.name.desc())
    elif order == "genre":
        if asc:
            query = query.order_by(Genre.name.asc())
        else:
            query = query.order_by(Genre.name.desc())
    return query.all()[15*(page-1):15*page]
def get_nb_books_filtered(author,genre,price_min,price_max):
    query = Book.query.join(Author).join(BookGenre).join(Genre)
    if author:
        query = query.filter(Author.name.like("%"+author+"%"))
    if genre:
        query = query.filter(Genre.name.like("%"+genre+"%"))
    if price_min:
        query = query.filter(Book.price>=price_min)
    if price_max:
        query = query.filter(Book.price<=price_max)
    query2=Book.query.filter(Book.id.in_(query.with_entities(Book.id)))
    return query2.count()//15+1
def get_nb_pages(nb_by_page,types):
    if types=="books":
        return int(Book.query.count()/nb_by_page)+1
    elif types=="authors":
        return int(Author.query.count()/nb_by_page)+1
    elif types=="genres":
        return int(Genre.query.count()/nb_by_page)+1
def get_next_book(id):
    book = Book.query.filter(Book.id==id).first()
    books=Book.query.order_by(Book.title).all()
    for i in range(len(books)):
        if books[i].id==book.id:
            if i==len(books)-1:
                return None
            else:
                return books[i+1]
def get_previous_book(id):
    book = Book.query.filter(Book.id==id).first()
    books=Book.query.order_by(Book.title).all()
    for i in range(len(books)):
        if books[i].id==book.id:
            if i==0:
                return None
            else:
                return books[i-1]
def get_nb_books():
    return Book.query.count()
def get_author(id):
    return Author.query.get(id)
def get_author_by_name(name):
    return Author.query.filter_by(name=name).first()
def get_authors():
    return Author.query.order_by(Author.name).all()
def get_authors_sample(nb_by_page, page):
    #authors are ordered by name
    return Author.query.order_by(Author.name).all()[nb_by_page*(page-1):nb_by_page*page]
def get_nb_authors():
    return Author.query.count()
def get_books_author(id,limit=None):
    if limit:
        return Book.query.filter_by(author_id=id).limit(limit).all()
    return Book.query.filter_by(author_id=id).all()
def get_genre(id):
    return Genre.query.get(id)
def get_genres():
    return Genre.query.order_by(Genre.name).all()
def get_genres_sample(nb_by_page, page):
    return Genre.query.order_by(Genre.name).all()[nb_by_page*(page-1):nb_by_page*page]
def get_genre_by_name(name):
    return Genre.query.filter_by(name=name).first()
def get_nb_genres():
    return Genre.query.count()
def get_book_genres(id):
    genres=[]
    for g in BookGenre.query.filter_by(book_id=id).all():
        genres.append(get_genre(g.genre_id))
    return genres
def get_genre_books(id):
    books=[]
    for b in BookGenre.query.filter_by(genre_id=id).all():
        books.append(get_book(b.book_id))
    return books
def get_nb_book_genres(id):
    return BookGenre.query.filter_by(book_id=id).count()
def add_genre_to_book(book_id, genre_id):
    book_genre = BookGenre(id=get_nb_book_genres(book_id)+1, book_id=book_id, genre_id=genre_id)
    db.session.add(book_genre)
    db.session.commit()
def remove_genre_from_book(book_id, genre_id):
    book_genre = BookGenre.query.filter_by(book_id=book_id, genre_id=genre_id).first()
    db.session.delete(book_genre)
    db.session.commit()
def supress_book_genres(book_id):
    for book_genre in BookGenre.query.filter_by(book_id=book_id).all():
        db.session.delete(book_genre)
    db.session.commit()
def get_books_by_authors_ap(authors,limit):
    liste=[]
    for author in authors:
        liste.append({"author":author,"books":get_books_author(author.id,limit)})
    return liste
def get_books_by_genres_ap(genres,limit):
    liste=[]
    for genre in genres:
        liste.append({"genre":genre,"books":get_genre_books(genre.id)[:limit]})
    return liste
def get_nb_rates():
    return Rate.query.count()
def get_rate_book(book_id, user):
    return Rate.query.filter_by(book_id_rate=book_id, user_id_rate=user).first()
def rate_book_user(book_id, user, rate):
    rate_book = Rate(id_rate=get_nb_rates()+1, book_id_rate=book_id, user_id_rate=user, rate=rate)
    db.session.add(rate_book)
    db.session.commit()
def update_book_rate(book_id, user, rate):
    rate_book = Rate.query.filter_by(book_id_rate=book_id, user_id_rate=user).first()
    rate_book.rate = rate
    db.session.commit()
def est_fav(user, book_id):
    fav=Favorite.query.filter_by(user_id_fav=user, book_id_fav=book_id).first()
    if fav is None:
        return False
    return True
def get_fav(user, book_id):
    return Favorite.query.filter_by(user_id_fav=user, book_id_fav=book_id).first()
def get_favs(user):
    favs=[]
    for f in Favorite.query.filter_by(user_id_fav=user).all():
        favs.append(get_book(f.book_id_fav))
    return favs
def get_nb_favs():
    return Favorite.query.count()
def fav_book_user(book_id, user):
    fav = Favorite(id_fav=get_nb_favs()+1, book_id_fav=book_id, user_id_fav=user)
    db.session.add(fav)
    db.session.commit()
def get_user(user):
    return User.query.get(user)
@login_manager.user_loader
def load_user(username):
    return User.query.get(username)