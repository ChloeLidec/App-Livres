##views permet de definir les routes de l app donc des differents pages

from .app import app,db
from flask import render_template, request,url_for , redirect
from .models import *
from flask_wtf import FlaskForm
from wtforms import StringField , HiddenField,PasswordField
from wtforms.validators import DataRequired
from hashlib import sha256
from flask_login import login_user , current_user,logout_user

class AuthorForm(FlaskForm):
    id = HiddenField("id")
    name = StringField("Name",validators=[DataRequired()])
class BookForm(FlaskForm):
    id = HiddenField("id")
    title = StringField("Title",validators=[DataRequired()])
    price = StringField("Price",validators=[DataRequired()])
    url = StringField("Url",validators=[DataRequired()])
    img = StringField("Picture(link)",validators=[DataRequired()])
    #champ pour le choix de l auteur liste déroulante
    author = StringField("Author",validators=[DataRequired()])
    genres = StringField("Genres(separated by comma)",validators=[DataRequired()])
class GenreForm(FlaskForm):
    id = HiddenField("id")
    name = StringField("Name",validators=[DataRequired()])
class FiltersForm(FlaskForm):
    author = StringField("Author")
    genre = StringField("Genre")
    price_min = StringField("Price min")
    price_max = StringField("Price max")
    order = StringField("Order(by title, author, genre, price) asc ou desc (ex: title asc)")


class LoginForm ( FlaskForm ):
    username = StringField("Username")
    password = PasswordField("Password")
    next = HiddenField()
    id = HiddenField()
    def get_authenticated_user(self):
        user = User.query.get(self.username.data)
        if user is None:
            return None
        m = sha256()
        m.update(self.password.data.encode())
        passwd = m.hexdigest()
        return user if passwd == user.password else None

class RegisterForm ( FlaskForm ):
    username = StringField("Username")
    password = PasswordField("Password")
    confirm = PasswordField("Confirm password")

class EditUserForm ( FlaskForm ):
    username = StringField("Actual username")
    password = PasswordField("Actual password")
    newpsswd = PasswordField("New password")
    confirm = PasswordField("Confirm new password")

@app.route("/")
def home():
    return render_template(
        "home.html",
        title="My Books !",
        books=get_books(),list_auth=get_authors(),list_gen=get_genres())
@app.route("/books/<int:id>",methods=("POST","GET",))
def books(id):
    author = request.form.get("author")
    genre = request.form.get("genre")
    price_min =request.form.get("price_min")
    price_max = request.form.get("price_max")
    order = request.form.get("order")
    f=FiltersForm(author=author,genre=genre,price_min=price_min,price_max=price_max,order=order)
    if order:
        f.order.data=order
        if len(order.split(" "))>1 and order.split(" ")[1]=="asc":
            order_f=order.split(" ")[0]
            asc=True
        else:
            order_f=order
            asc=False
    else:
        order_f="title"
        asc=True
    books=get_books_sample_filtered(id,f.author.data,f.genre.data,f.price_min.data,f.price_max.data,order_f,asc)
    nbp=get_nb_books_filtered(f.author.data,f.genre.data,f.price_min.data,f.price_max.data)
    return render_template(
        "books.html",
        title="My Books ["+str(id)+"] !",books=books,nbp=nbp,id=id,form=f)
@app.route("/books/filtered/<int:id>/<string:auth>/<string:gen>/<string:pmi>/<string:pma>/<string:order>",methods=("POST","GET",))
def books_filtered(id,auth,gen,pmi,pma,order):
    author=auth.replace('<input id="author" name="author" type="text" value="',"")
    author=author.replace('">',"")
    genre=gen.replace('<input id="genre" name="genre" type="text" value="',"")
    genre=genre.replace('">',"")
    price_min=pmi.replace('<input id="price_min" name="price_min" type="text" value="',"")
    price_min=price_min.replace('">',"")
    price_max=pma.replace('<input id="price_max" name="price_max" type="text" value="',"")
    price_max=price_max.replace('">',"")
    order=order.replace('<input id="order" name="order" type="text" value="',"")
    order=order.replace('">',"")
    f=FiltersForm(author=author,genre=genre,price_min=price_min,price_max=price_max,order=order)
    if order:
        f.order.data=order
        if len(order.split(" "))>1 and order.split(" ")[1]=="asc":
            order_f=order.split(" ")[0]
            asc=True
        else:
            order_f=order
            asc=False
    else:
        order_f="title"
        asc=True
    books=get_books_sample_filtered(id,f.author.data,f.genre.data,f.price_min.data,f.price_max.data,order_f,asc)
    nbp=get_nb_books_filtered(f.author.data,f.genre.data,f.price_min.data,f.price_max.data)
    return render_template(
        "books.html",
        title="My Books ["+str(id)+"] !",books=books,nbp=nbp,id=id,form=f)
@app.route("/authors/<int:id>")
def authors(id):
    authors=get_authors_sample(15,id)
    liste = get_books_by_authors_ap(authors,3)
    return render_template(
        "authors.html",
        title="My Authors ["+str(id)+"] !",
        list_auth=liste,nbp=get_nb_pages(15,"authors"),id=id)
@app.route("/genres/<int:id>")
def genres(id):
    genres=get_genres_sample(10,id)
    liste = get_books_by_genres_ap(genres,3)
    return render_template(
        "genres.html",
        title="My Genres !",
        list_genre=liste,nbp=get_nb_pages(10,"genres"),id=id)
@app.route("/detail_book/<id>",methods=("POST","GET",))
def detail_book(id):
    book=get_book(id)
    if current_user.is_authenticated:
        rating=get_rate_book(id,current_user.username)
        if rating is None:
            rating=0
        else:
            rating=rating.rate
        fav = est_fav(current_user.username,book.id)
        return render_template(
        "detail-book.html",
        book=book,genres=get_book_genres(book.id),rating=rating,fav=fav,prev=get_previous_book(book.id),next=get_next_book(book.id))
    return render_template("detail-book.html",book=book,genres=get_book_genres(book.id),prev=get_previous_book(book.id),next=get_next_book(book.id))

@app.route ("/edit/author/<int:id>")
def edit_author(id):
    if not current_user.is_authenticated:
        next="edit_author"
        id=id
        return redirect(url_for("login",next=next,id=id))
    a = get_author(id)
    f = AuthorForm (id=a.id , name=a.name)
    return render_template (
        "edit-author.html", form=f)
@app.route("/detail_book/author/<int:id>")
def detail_author(id):
    if id is None:
        return render_template("add-author.html",form=AuthorForm())
    a = get_author(id)
    return render_template(
        "detail-author.html",
        author=a)

@app.route("/save/author/", methods =("POST",))
def save_author():
    a = None
    f = AuthorForm()
    #si c'est une modification
    if f.validate_on_submit():
        if f.id.data:
            a = get_author(f.id.data)
            a.name = f.name.data
            id=int(f.id.data)
            db.session.commit()
            return redirect(url_for("detail_author", id=a.id ))
        else:
            #recupere l'id du dernier auteur
            id =int(get_nb_authors()) +1  
            a = Author(id=id,name=f.name.data)
            db.session.add(a)
            db.session.commit()
            return redirect(url_for("detail_author", id=a.id ))
    a = get_author(int(f.id.data))
    return render_template(
        "edit-author.html", form=f)

@app.route("/add/author/")
def add_author():
    if not current_user.is_authenticated:
        next="add_author"
        return redirect(url_for("login",next=next))
    return render_template("add-author.html",form=AuthorForm(id=None,name=None))

@app.route("/delete/author/<int:id>")
def delete_author(id):
    if not current_user.is_authenticated:
        next="delete_author"
        id=id
        return redirect(url_for("login",next=next,id=id))
    a = get_author(id)
    db.session.delete(a)
    books = get_books()
    for book in books:
        if book.author_id == id:
            db.session.delete(book)
    db.session.commit()
    return redirect(url_for("home"))
@app.route("/add/book/")
def add_book():
    if not current_user.is_authenticated:
        next="add_book"
        return redirect(url_for("login",next=next))
    return render_template("add-book.html",form=BookForm(id=None,title=None,price=None,url=None,img=None,author_id=None,genres=None))

@app.route("/save/book/", methods =("POST",))
def save_book():
    b = None
    f = BookForm()
    #si c'est une modification
    if f.validate_on_submit():
        price=f.price.data
        if not price.replace('.','',1).isdigit() or float(f.price.data) < 0:
            f.price.errors.append("Price must be an integer greater than 0")
            return render_template(
                "edit-book.html", form=f)
        if f.id.data:
            b = get_book(f.id.data)
            b.title = f.title.data
            b.price = f.price.data
            b.url = f.url.data
            b.img = f.img.data
            auth= get_author_by_name(f.author.data)
            if auth is None:
                auth = Author(id=get_nb_authors() +1,name=f.author.data)
                db.session.add(auth)
            b.author_id = auth.id
            supress_book_genres(b.id)
            f.genres.data = f.genres.data.split(",")
            for genre in f.genres.data:
                if genre!="":
                    g = get_genre_by_name(genre)
                    if g is None:
                        g = Genre(id=get_nb_genres() +1,name=genre)
                        db.session.add(g)
                    #si le livre n'a pas deja ce genre
                    if g not in get_book_genres(b.id):
                        add_genre_to_book(b.id,g.id)
            id=int(f.id.data)
            db.session.commit()
            return redirect(url_for("detail_book", id=b.id ))
        else:
            #recupere l'id du dernier livre
            id =get_nb_books()+1  
            auth= get_author_by_name(f.author.data)
            if auth is None:
                auth = Author(id=get_nb_authors()+1,name=f.author.data)
                db.session.add(auth)
            b = Book(id=id,title=f.title.data,price=f.price.data,url=f.url.data,img=f.img.data,author_id=auth.id)
            f.genres.data = f.genres.data.split(",")
            for genre in f.genres.data:
                g = get_genre_by_name(genre)
                if g is None:
                    g = Genre(id=get_nb_genres() +1,name=genre)
                    db.session.add(g)
                add_genre_to_book(b.id,g.id)
            db.session.add(b)
            db.session.commit()
            return redirect(url_for("detail_book", id=b.id ))
    return render_template(
        "edit-book.html", form=f)

@app.route("/edit/book/<int:id>")
def edit_book(id):
    if not current_user.is_authenticated:
        next="edit_book"
        id=id
        return redirect(url_for("login",next=next,id=id))
    b = get_book(id)
    g = get_book_genres(id)
    genres=""
    for genre in g:
        genres+=genre.name +","
    f = BookForm (id=b.id , title=b.title,price=b.price,url=b.url,img=b.img,author=b.author.name,genres=genres)
    return render_template (
        "edit-book.html",
        form=f)

@app.route("/delete/book/<int:id>")
def delete_book(id):
    if not current_user.is_authenticated:
        next="delete_book"
        id=id
        return redirect(url_for("login",next=next,id=id))
    b = get_book(id)
    #supprime le livre du genre
    supress_book_genres(id)
    db.session.delete(b)
    db.session.commit()
    return redirect(url_for("home"))
@app.route("/detail_genre/<int:id>")
def detail_genre(id):
    g = get_genre(id)
    books=get_genre_books(id)
    return render_template("detail-genre.html",genre=g,books=books)
@app.route("/add/genre/")
def add_genre():
    if not current_user.is_authenticated:
        next="add_genre"
        return redirect(url_for("login",next=next))
    return render_template("add-genre.html",form=GenreForm(id=None,name=None))
@app.route("/save/genre/", methods =("POST",))
def save_genre():
    f = GenreForm()
    if f.validate_on_submit():
        if f.id.data:
            g = get_genre(f.id.data)
            g.name = f.name.data
            db.session.commit()
            return redirect(url_for("detail_genre", id=g.id ))
        else:
            #recupere l'id du dernier genre
            id =get_nb_genres()+1  
            g = Genre(id=id,name=f.name.data,img=f.img.data)
            db.session.add(g)
            db.session.commit()
            return redirect(url_for("detail_genre", id=g.id ))
    return render_template("edit-genre.html",form=f)
@app.route("/edit/genre/<int:id>")
def edit_genre(id):
    if not current_user.is_authenticated:
        next="edit_genre"
        id=id
        return redirect(url_for("login",next=next,id=id))
    g = get_genre(id)
    f = GenreForm (id=g.id , name=g.name)
    return render_template("edit-genre.html",form=f)
@app.route("/delete/genre/<int:id>")
def delete_genre(id):
    if not current_user.is_authenticated:
        next="delete_genre"
        id=id
        return redirect(url_for("login",next=next,id=id))
    g = get_genre(id)
    #supprime le genre des livres
    for book in get_genre_books(id):
        remove_genre_from_book(book.id,id)
    db.session.delete(g)
    db.session.commit()
    return redirect(url_for("home"))

@app.route("/fav/book/<int:id>")
def fav_book(id):
    b = get_book(id)
    u = current_user
    if current_user.is_authenticated:
        if not est_fav(u.username,b.id):
            fav_book_user(b.id,u.username)
        rating=get_rate_book(id,current_user.username)
        if rating is None:
            rating=0
        else:
            rating=rating.rate
        fav = est_fav(u.username,b.id)
        return render_template(
        "detail-book.html",
        book=b,genres=get_book_genres(id),rating=rating,fav=fav,prev=get_previous_book(id),next=get_next_book(id))
    return redirect(url_for("detail_book",id=id))
@app.route("/unfav/book/<int:id>")
def unfav_book(id):
    b = get_book(id)
    u = current_user    
    if current_user.is_authenticated:
        if est_fav(u.username,b.id):
            f = get_fav(u.username,b.id)
            db.session.delete(f)
            db.session.commit()
        rating=get_rate_book(id,current_user.username)
        if rating is None:
            rating=0
        else:
            rating=rating.rate
        fav = est_fav(u.username,b.id)
        return render_template(
        "detail-book.html",
        book=b,genres=get_book_genres(id),rating=rating,fav=fav,prev=get_previous_book(id),next=get_next_book(id))
    return redirect(url_for("detail_book",id=id))
@app.route("/rate/book/<int:id>/<int:rate>",methods =("POST",))
def rate_book(id,rate):
    if rate < 0 or rate > 5:
        return redirect(url_for("detail_book",id=id))
    b = get_book(id)
    u = current_user
    if u.is_authenticated:
        r = get_rate_book(id,u.username)
        if r is None:
            rate_book_user(id,u.username,rate)
            r=get_rate_book(id,u.username)
        else:
            r.rate = rate
        db.session.commit()
        fav = est_fav(u.username,b.id)
        return render_template(
        "detail-book.html",
        book=b,genres=get_book_genres(id),rating=r.rate,fav=fav,prev=get_previous_book(id),next=get_next_book(id))
    return redirect(url_for("detail_book",id=id))
@app.route("/search/", methods =("POST",))
def search():
    #recupere la valeur du champ de recherche
    search = request.form.get("search")
    #recupere les livres dont le titre contient la valeur de recherche
    books = Book.query.filter(Book.title.like("%"+search+"%")).all()
    authors = Author.query.filter(Author.name.like("%"+search+"%")).all()
    return render_template( "search-result.html", books=books,authors=authors)

@app.route ("/login/", methods =("GET","POST",))
def login():
    f = LoginForm ()
    if not f.is_submitted():
        f.next.data = request.args.get("next")
        f.id.data = request.args.get("id")
    elif f.validate_on_submit():
        user = f.get_authenticated_user()
        if user is None and User.query.filter_by(username=f.username.data).first() is None:
            f.username.errors.append("Unknown username")
            return render_template (
            "login.html",
            form=f)
        elif user is None:
            f.password.errors.append("Invalid password")
            return render_template (
            "login.html",
            form=f)
        else:
            login_user(user)
            next = f.next.data
            id = f.id.data
            if next=="" or next is None or not next:
                next = "home"
            elif next=="user":
                url=url_for(next,name=user.username)
            if id:
                url=url_for(next,id=id)
            else:
                url=url_for(next)
            return redirect(url)
    return render_template (
    "login.html",
    form=f)
@app.route("/register/", methods =("GET","POST",))
def register():
    f = RegisterForm ()
    if f.validate_on_submit():
        if User.query.filter_by(username=f.username.data).first():
            f.username.errors.append("This username is already taken")
            return render_template (
            "register.html",
            form=f)
        if f.password.data != f.confirm.data:
            f.confirm.errors.append("The passwords do not match")
            return render_template (
            "register.html",
            form=f)
        m =sha256()
        m.update(f.password.data.encode())
        u = User(username =f.username.data , password=m.hexdigest ())
        db.session.add(u)
        db.session.commit()
        login_user(u)
        return redirect(url_for("home"))
    return render_template (
    "register.html",
    form=f)
@app.route("/user/<name>", methods =("GET","POST",))
def user(name):
    f=EditUserForm()
    if not current_user.is_authenticated:
        next="user"
        return redirect(url_for("login",next=next))
    if f.validate_on_submit():
        favs=get_favs(name)
        if User.query.get(name).username != f.username.data:
            f.username.errors.append("Username error")
            return render_template (
            "user.html",
            form=f,favs=favs)
        if f.newpsswd.data != f.confirm.data:
            f.confirm.errors.append("The passwords do not match")
            return render_template (
            "user.html",
            form=f,favs=favs)
        m=sha256()
        m.update (f.password.data.encode())
        if User.query.get(name).password != m.hexdigest():
            f.password.errors.append("Invalid password")
            return render_template (
            "user.html",
            form=f)
        m = sha256()
        m.update(f.newpsswd.data.encode())
        u = User.query.get(name)
        u.password = m.hexdigest()
        db.session.commit()
        return redirect(url_for("home"))
    favs=get_favs(name)
    return render_template (
    "user.html",
    form=f,name=name,favs=favs)
@app.route("/logout/")
def logout():
    logout_user()
    return redirect(url_for('home'))
