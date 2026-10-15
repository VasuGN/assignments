class Automobiles:
    def __init__(self):
        self.brand = "BMW"
        self.model = "X5"
        self.color = "Black"


class Car:
    def __init__(self):
        self.automobile = Automobiles()
        self.price = 7500000
        self.owner = "Vasu"

    def display(self):
        print("Brand:", self.automobile.brand)
        print("Model:", self.automobile.model)
        print("Color:", self.automobile.color)
        print("Price:", self.price)
        print("Owner:", self.owner)


car = Car()
car.display()