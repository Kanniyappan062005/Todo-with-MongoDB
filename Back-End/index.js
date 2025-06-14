import express from "express";
import cors from "cors";
import mongoose from "mongoose";
const app = express();
app.use(express.json());
app.use(cors());

//MongoDB Server
mongoose.connect("mongodb://127.0.0.1:27017/todo").
    then(() => console.log("MongoDB Connected Sucessfull!")).
    catch(() => console.log("MangoDB Failed!"));

//Fruit Model
const Fruit = mongoose.model("Fruit",{ name: String }, "fruit")

app.get("/fruitlist", (req, res) => {
    Fruit.find().then((retData) => {
        res.status(200).json({
            fruits: retData,
        })
    })
});

app.post("/fruitlist", (req, res) => {
    const { newFruit } = req.body;

    if (!newFruit) {
        return res.status(400).json({
            message: "Please add new Fruit.",
        });
    }

    const NewFruit = new Fruit(
        {
            name: newFruit,
        }
    )

    NewFruit.save()
        .then(() => res.status(201).json({ message: "New Fruit Added Sucessfull!" }))
        .catch(() => res.status(500).json({ message: "Fruit cannot added!" }));
});

app.delete("/fruitlist/:fruit", (req, res) => {
    const deleteToFruit = req.params.fruit;

    Fruit.deleteOne({ name: deleteToFruit })
        .then(() => {
            Fruit.find().then((updatedFruit) => {
                res.status(200).json({
                    fruits: updatedFruit,
                });
            })
        }).catch((err) => {
            res.status(500).json({
                error: "Failed to Delete",
                details: err,
            });
        })
})

//Back-End Server
app.listen(5000, () => {
    console.log("Server Started at http://localhost:5000");
});