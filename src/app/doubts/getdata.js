"use client";
import axios from "axios";

export const getData = async (token) => {

    // const userId = "prince.paswan@pw.live";
    // const passowrd = "kgvf514c0i"


    const tokenData = await token
    // console.log();


    let course = []

    try {
        let abc = await axios.get(
            "https://admin-api.pwskills.com/admin/course/allcourses",
            {
                headers: {
                    Authorization: `Bearer ${tokenData.slice(1, - 1)}`
                }
            }
        );

        // console.log(abc.data.data[0].title);
        // console.log(abc.data.data[0]._id);

        // setApiData(abc)
        course.push(abc.data)
    } catch (error) {
        alert(error?.message)
    }

    return course

}