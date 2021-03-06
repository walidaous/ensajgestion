/*!

=========================================================
* Paper Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import "bootstrap/dist/css/bootstrap.min.css";
import React, {useEffect, useState} from 'react';
import { Button,Modal,Input } from 'react-bootstrap';
import axios, {Axios} from "axios";
import {Card, CardBody, CardHeader, CardTitle, Col, Form, FormGroup, Row} from "reactstrap";
import QRCode from 'qrcode.react';
import jsPDF from "jspdf";


function Salle() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [name, setName] = useState('');
    const [type, settype] = useState('');
    const [bloc, setbloc] = useState('');
    const [b, setb] = useState('');
    const postData = () => {
        axios.post(`https://gestionsalles.herokuapp.com/salles`, {
            name:name,
            type:type,
            bloc:b

        })
    }
    const [APIData, setAPIData] = useState([]);
    useEffect(() => {

    }, [])
    useEffect(() => {
        axios.get(`https://gestionsalles.herokuapp.com/salles`)
            .then((response) => {
                setAPIData(response.data);
            })
    }, [])
    const [APIbloc, setAPIbloc] = useState([]);
    useEffect(() => {
        axios.get(`https://gestionsalles.herokuapp.com/blocs`)
            .then((response) => {
                setAPIbloc(response.data);
            })
    }, [])

    useEffect(() => {
        axios.get(`https://gestionsalles.herokuapp.com/blocs/61c1227c361e0304847f3c99`)
            .then((response) => {
                setb(response.data);
                console.log(APIData);
            })
    }, [])

    const onDelete = (id) => {
        axios.get(`https://gestionsalles.herokuapp.com/blocs/${id}`).then((response) => {
            setb(response.data);
            setbloc(response.data.name);
        })
    }
    function getb(id)  {
        let a;
        axios.get(`https://gestionsalles.herokuapp.com/blocs/${id}`).then((response) => {
            a= response.data.name;
        })
          return a;
    }
    const print2=( x, y)=>{

        var doc =
            new jsPDF('l', 'mm', [297, 150]);

        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        var a=10;
        doc.addImage("data:image/png;base64,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", 'JPEG', 10, 10, 15, 15)
        a=a+80;
        doc.addImage("https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=aaa", 'JPEG', pageWidth/2-35, pageHeight/2-60, 50, 60)
        doc.text(x,pageWidth/2-10,pageHeight/2+10,'center')
        doc.text(y,pageWidth/2-10,pageHeight/2+20,'center')


        doc.save('a4.pdf');
    }

    const print = () => {

        var doc =
            new jsPDF('l', 'mm', [297, 150]);

        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        var a=10;
        APIData.map((data, key) => {
            doc.addImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQ4AAAC7CAMAAACjH4DlAAAB5lBMVEX///8ARawAIGEAH14ARKgAL3wANYoAM4UAQKIAImIAP50AQaIANo0AQ6sAJGgASrPC2PAAacUAOZP3ZQAAKnUAJ2+swNMAJmsAD1InWIvyYgCErtoAGl4ANY4AYL61zOO+yNwAIoVdl9Ln8fsAPKTqYACz0fAve8zfWQDiWgDSUwDm8v/v8/fy1L/zWAAUTKbKUADV4+//8uX/jDT/8ducxe6aQgDV4ex7suv13MO0RQAAHnPASwAANaDK1uMAK30ANpiIKQCnPwDz28wAAEgAHmn8k1B6l7cAI3GjwN4je9GbOQDu3tfkt5AAAFFcjr8AOn//q1T/fAD/1rEAJX3+yZD+ljn/cAD/uGvXZADCWgCjMQAAM3I1ZpkAMnoAUrfMRADivp/boW7+nUzMVwqIqsoURH9RdaEvYpZngKIAQH5FdqV6krYiXp3+uHv+qWP+y6JBdrP/ixcASpX7soX/xIH/2J3/68b4mmR4a2v+mkI7Q1r6iTP0cyL/vG+1o5NWUFxJicb/569NldvbdShJkN/hcR7TdzHkllHooVzbhDQUc9HGahhkU1B+TyzLhEqYTQ84T3TQlGGyZzDXyLyUhX1OY4IqbLIAAHqNxPmCIACsUyi2OQCuTwDCdzbEZSndlG7rfzxXoIgxAAAY20lEQVR4nO2diV8aSdrH0agQDeKFUUBMbPBEkY6OoqiMhijJGBRU4n2iiQeKJJN5feO842s8x13f3dkd3tlXszP/6VvVDXRV9UHzmSii/maSQNfRVd9+nqeqG6hSKO51r3ulrbpLqVQ34QbJEihfKU11I26O2lbKni+v9N9bCKvu5QcPyl6vrvTbUt2SG6HSKcODBw8Mzw1v3wXuTUSxzuCARAzLniepbk2q1V3+8EFMhvyVVDcn1XqSH6fxoKw8kOrmpFpug4HDsWJJdXNSLMpjMGTGpH2X6uakWt3lmQ9iNAyr/aluTqpV+jhuG5mvp9tS3ZxUK/DQ8DCqzNeeux46utcectahvfeV1fzMzIcMkoeGjTt/J1e64YIDSz6UYe3+rqW7dG3Vlc/wcK2nujE3QW2BtaHXLmAcQ3d+ShpV6fpbV5lr+s6HjpgsT9ZDnZ67fntPlXLBs229MoUtuRHqD68Fuu/61IvTeqdW+zZQeQ+EkWXN5dIOdA55ntz1qMGocsOl1WoHSmaGPAX3MzBFIFsbVcnAsv7OWwgMHVG5Su78DYst1FkSk7YkdNefdQQ2XHEcAyXuVDcn1Xo3U8Jp5jZMwmjaPhoMbr5gtRgMBrd8PpqmZRVGfKUkO9R9xU29crX4gpvDY9ter7eYlR+83B4b23mz+UNwy56ICQgd2TENZOuvpclXJjq4ObbtbwIqxtTECJAZGx7eDI76xKEEwj1xHD1p7iv2TW8xAaKYx6XYvz32Jvj+va9FqIqVHI6GciOtfWVrTBIFSgUYyvZw8P0WaSZUaITDMVSVzvctvm1py+BbSrF358NWI2ollRud2Urmv2xlz1A6+wo9nByNqPzbw99vxYKJxRPuUcaUE05nXwl6E/ddxEyKvcPBxj6AxBKqiNPoydlL5zu4HxL3W6fTNeHSMYJG4h378NHeHRlBcKT1lPQHprtSAgEUTEKexQUmJF6/38+MNxBJsfc/whU5yhxGygprWt+vJMABp2O7Y8Ojox9bovo4OjoaHF7c2fZvQywAiu4/czg9iqT1zX3QKwlj99OoT6wovQWmb7u7/sNVZ5xGRbjqOlv/1WUfaxKn4f3RLjjrignc0fTZff81xOEYCRdcV8uvRkG/KI0x3nxLSBa9teJRTCPljVfe4itVo6h57EhaRlxUJDeOo6jip/FnwRZ5d8E3U0ERHNuiQQOXLeKMG0dFzj8/Ffufvdi62iZfpew7OrOAdN/LLN9aWFEUMw5nuNvuGx3e9o4tStz/3mz5tgV46HR2eaUte9aKophyI/AQ7Xu/uT324n16AqFBNOXhKPb2yStNhXPjNJzW2DALiPzw4/APMpHeLNGbfr51eGV2pcDq5HDUoMNsy/sf3nxIxyhCbxab60gg8nCAYTaOI9dJTkl9mx/+e0veAHWTRB/7zXW4zB9llbRF8ori3mLd4z/58Z2MJnzUeuME/IXEEZTVCVtYVZQblbNQL/AgjG4ZHU0/HifeulqMx66s+WWr1ZkbxxFJ50cduOjN3bpaVOZNGaWoKgSHKXTlrbw+0VufMB51ZhnT0gJjXpyGypred7Ok7ItmzD4WEw8u1XmIr9S0XkMjr1ObtbX1ybiLpT1LFcfRdZDWT36ENPiptp6TOZgge3dNliovKpX6dvkKIx/KY243waSy0qpWRZXnNKb5Z7OCokfHER7j0vahR4yjq+b2DLOoBl/MITyk7MO2z+HI67qFvsKoJXg418ziaJ47lLAPtzErTiNLcxt9hdXWae1cM6u52hPR8VafweFQG9P68yZp2d9/ro8CcYwfi0zXqXa1Kism00GaP0OXVt/JYbOD5VF/OC94D1ZZmMXJdFtDR1S072h8zsHqUPD21p2B4Ji9vaEjKnr0aLw5CuSU7zBUexfiKy+rU9DCa1bfyefmi6iB8B6NF9SYOOPo2r91M3Qh9R1/XrrocDg6HEtkRNXPqhEc7alp33WLbjmeWOqAckzgH1K2m7jYkTF7i4dZXLT9GFgHwwONILYDxFfUL2/1MIuLtgcnIJELx8RJ/OOXVmNGXGrT3QgdMdH2E8dFR0dvx8TRYNRj9OoMhMetH2YJ0Y0Lp8BhJnsnzhYgENtBVxxGVsZtnqGLqW/w9GKyd3Jy4ssgMI6fTZxtZNzSm/sE6hs8nmCAHM+HNGoER3s6f9P4T4iePzmbBLr8y/KsWh0lotbctofGSWh+4ahjcvKbv/5UPqsBQOCsw5jOX7z+0+pbOIcm8j9/+VsYAMnK0BzcydDBiR48P5oAJgKBaEyaOzJDl1LL4PlZx+Srv/5tefYuhw5OtP3vv1x2vPrrrxtPUt2UGyLgNP++fPXNedp+Me5ri+4b/OVy4vJyofG7VDflhoi2L/y79/Lyl8G0/GbcVYju2zoHNvJlUObvbm+/gNecAxM5T/MvpX9F0X2NC0dnv5wPfmdpK3WXQlEWqGttha00Odks4mVFlu+huvFs4mu4/OOff/npp19XpstZTa+s/PpuPWCTTUSgM8ktKWRZXy5PSh7u91kUr2xA6NyWwBqRTeQmpfTdWvnqwzJEz58b8qeWp1f65f2AstvDb++aOxkeVPnzsmT0vJxrWdvb52Si0FIklv6HWL7nr/uFWlj6rtzwuoxb4Jdb6fd12eO3stbX738s0JnppHBMP+c3QEJl0wiO6TIi1TAt4AeW/im8kwYBHLb+8jKyNvS0z98GElqIZUUApmE5mZ/mfmUcj9f5PZWBoy0w7ZKAAfX8taDpoXKXC+FYTWbd5K+L44GQuyTGYelfTQADlsp8Wypt9+v5mfximZnlSTyn/8o4HhjKeT+FTYiDl0EMyKqkfdjWXgu2eCqJT3Go6TJkVd3EInDw0g1TPHeBvcXzEDgCy2UPeBUJyGBYk4oDoBrBUo/fyQ+mlECX/gyOzLJl8mMCEoeBwFFabuBXI3AIHMyXWNjV8i5fuMkCBiuF42ESInEI5Mgnz87gQHPgOCwrrky8BoMh//HjfIPBgB8HMsyIu0s3uDiCbTYsy18O9k/iEGiAYeodGRqGDFgdOI7AMpYKeM5MTS2/XZ2amsonq88UnrIwWifq4QpNyZ96ABz5hAxSev2Ww2HjlwXKNKzi7gJxYPW70D5ZVrSZ+OmnAt1tFNXWVhBYfsxrm/izs3JXJpk72qB8reyphwCOx1oJdYYS4cjP1L7F3IXEkYnhqCx34cWX4zN9S/fKDJGYXyK2hHr3MpmVY+gSvHmQh8O1XlApoQauZtu0cAsM2jV0qJe2jnW8G4bHqGlRKzMGvG6XyN4clndkTkRa2ZsUULwuSUQrQmI48rUzaJ9IHPkYjrUhvOgqZthtIRfuMK5p4fs/fj/QQlNyP9kC1TzGpB1KBsdjQeW7UHcBOFx4KmK7lrcl+OmJlbLWZ+JltZCWdlV4mHBvYOdwabF3M3I3bQA4sJJabRLWEerEyqK1rCE9Bji0aNoA8iNAy/IAWofWNYTPId0bndqBAa0rps4R4eCxNoPg0M6UE6dcfiIXRycRLJPDIaYSzgIYHIhcJA5MLvxCUp7O1eXwxnQoFPKs6/X6/nXBjtmW0VO4VgPTeK0DMr9CwsNRkgwOl1ZMro24u5I4COsoIUoOhNzoh7bdgdLS0srutjab1J1YIIyeYmC5272BnXPAIy+YXhUO0IBY8wEO3AIwHBvZZElX2BNI8ple2/QMWkP2WwvRrxKZn/WBYiW4kgilIbIsqp6Yk0McaMIAigOMLAO8op2dMxueQCDB/Tyi7lW0koEhvcWyosRbI2+iTvG69LVwDMTGCEt/GO9xD4ojsMHHwTJRbnj0pd1yvu1g0Q/hOCr5J5W3ZjCFLBYKVdIzs/5EXFjjII5sUZXE3AW2DE3owXBQG51ChSE1+GLD465MOMWmNrKRhpQoN0DXu7HGlWTL29aDxAGlFFPP0yo0ntkEyqLdVnpiOHqw4xgOi0cpypQholRu6BOsnu7GePeEmcHJgzeuU9a3NZPD0ZkMjuwBdnQhceDOwqxIKaGSnh7l0BA+2hCyeGbQE/SEmVF1XYlfBFmrBgMcSrg0ZjbzJ7pQppj4OHqUSClw/ug79v+ezhDshEXPrDkZy6fErUOhiCbHSmF1QAFz6lGCSy7q/N1hkJ8r1bPBVO+OjCi5fmX35MjxFogjmzt/NloDwiiaQuIYUSqRUrCnSHkl7APEEQj3xOvP5uOgqnoYqsS50IpAmRzlhltk5uFW9qClckJM9dTeiBKpSDkiZ6JOhUZEfYOvET4O1JfCYdK7oN1GrQM5SqzUQXlyZJy7JycsbO/UXg5a/0g4OgNdf4SXj8iYmX5VHBueCFFbRaiBh6Ongly4hKp6VIETEz57UeSJQBeehCuwXJEG9niAaMwjjywcOfJFjix42ZFIpftRBX7I6rFY9FY8Hw+HggpEKvCCQlLmVEQE7EOP56oIRdto2yOaF0o8h6EiXxNHt6KqCO9WBTBdvRU7VsHHobBUVlllAMkp2uPxKIhgl6DCGjcC/VO8KYWJvQXgeCRbFTwcWGpFpFJhA5cZO1gUsqHLLDL5hFb5sQVC1qcjeGGBFlh5+2BVO7FCI5H4zwwDVrysM3EwpSJP+ecUkRwcCncRweNRVZUcHMBC3FWRXGcFLCLFgxgvqfanWH5nJJ5UEMJrehpK+HmcgHWMPBXV/+I4avCyDA5LVS7RnaIwD4fIiElVru/VOJ8+leBRRF7i7gheee4ex9fjxNOsCWemwDqKCEWqxFWNtsVW48QKOiEOBVVTVIFXSL51SmzQQ1XrPfuFuU4nXjVyEiIC6HPx5AjyJeaAlSgbSuQtDRHyvLl6CyUqrCwPB7tMnjss1pWY2iU/U7fYAp5QTaHV6awQKqzCzIPaJ3uMDB8FvAYm+vkyD0euVfZPsURwWKqs0jxyE/+ex2Jp9YQiViEbce6hEcBtJKwDhUVVEeWtiaYeDTXc6kzRFauSwYEVjS2i2LCnIirFVOSU+fOmAn3I6OTV5KxBG6jvIlJD1a1x6UPOIjw10VLbVA1R31fAoWgt/Co4oI0Y88iqnIVIdLDt885kRcRDWZjg5xFXYR1gWp4lwcOp4mKHhYlTtrY2W0N1dXV7Oy+qVNeoyPLoqkl6I996EPHOnSWwziMqisSR9xVwKCyRLHEcKgRHa/ve3h4IEkZjoRHIyr96bp6loevPtUuZoYCcNdLewrOOPPk/iAc40EunQhZgrSarFcZhM85mZWXlqVSq6OXM4+/PsmfKw4sjOKROI4wjwYJcDSB25KFSJYHjwKlCiyI4LPpZZ56IUByFKidcNgwItiJXlcf/Ta3eqsLPUsj1qGpWJXgKUamyIpLeAnCocCVjHXhZE7K0ALWnVonIhDjLgZVIm+XNDPRGIgs3eaD2ycYnlMkoOVGHOPBLl5yzoEVRHHC9EpErp1JzONqNuIGZsnje4snCG9h10BBLcr/sSs44gG3NSg5rAAdhTclZhygOcFVFeKhMHI6CQieRZiXNY59oYNd+/OswnmR9BRTPkFwmFuJA1iTKAm/29JLiugxxIEUJHJYqdRZWdewMqHU01KhVeKKpBrfmVqMpD8vAXV4b0XY5yjMZpSbqAAdRQDVrlNLsftxWbQd4WRyHouClSbBFKA6qfZbIhPOgWl8S7evilk3SFwqfQFKm2X0Jb+HjyMpSS6mLa20CHPDCCjVIjeAAQy2ZR9VVWOW2MT/sodxVvOQuLrgcqIk0k5BURCa1VDAVwiEpZAE4bMWaLD4OS5Vg3ah1gGmFkWxvlklduA8mqO1VB4VqE5Gm5u7vC0jDURXW8PXSStYu9TvmP4dD2jpAg8nrx/QIw1Et4FIZGawlZvCLm7hAqicsRz1bVc1X6/4szlut2RcPpleKA7iLAA8ch6WKjB5sHij+4a6X8W/RUDXqDDyxRtALqkl/k/KWq3QW+MBBqE8YDlCLQB6xk89yhl5N+IraJPxUyWbUkJX8JoUjIynhOPAk/oJXthqNmqyBwAEmbBlZsk6dZTIibr8/i9es7hKOCRSZMUPzUvTTa2gdV4iDcZcEOMCAqTZlJJa6C5tRFmqIdP78PtqEWbJ2jejUI2nr6MJwYNyFcFjayWvDx6Fw/6xJyENt0hSiz/HBKI6na8RWVALeQjagSuw2/6pxCLgLH4el+mBWbeJ5FVZGM7uPfneQOiB9RXxZFLIFavFl7AAOyVkXfxqG4CDKCuKAkZ2oQijmtRs1moz48kgkiwyN+uffsMlkQSHZ7lnR8aIdGBKRWWzqAXBokpLpAJmkm7AkEejtRjWeTSM0BBRAC4GpEIk6ioGZfICDxv123BMsvxnxc2s0L0VnE2C+piFaIDb1oPaNhUnJyE35G4iyRuEVi237PxN1CA90NnfVfqGmq4uZWjNWZDJ1dXWpjft6N0V+BYJXZ6H4hzfUAa8XB2LBlCpIUghXG5kkfHPUQFbRIJiNaUx162/7QAcvX/78Evzb3trqFmTMb5fEQ1CynUDps3Jbg62hwVbtdheAf9On1fe6173uda973ST12VHRCgX7QiAn3YKkYG9i7z429n0XX2KLZo60cIn2vj5s/S1whD3jDVLf+TeIXi0o/nEJ/r28FFhcbvCs9/Ly8t/sm4UJ8PrybIF9N3/Uccnq7HQhusr2ycTEhGPimFYMHi5FdXaK7DzYclg/DrR5o3j0ffnXt5z+BXB8A1+8EsJx+e2rV5P/x7ymzyfB68mOL2zS/MQko164DPsRuxPdScfFxYXjlFYsLF0wcjQ31x9ya7Rv1c5BfbpRi9j1fQF9fPUKwXEJ338jiAMk9LI4Go8me4Emz9iNSOfPejvickwwPE4cHQ7HEsAxOB7d8MLR7Giu/xzdV4k+ZnfjMg9eT0flKYrjVdxZ5hkcvUI4JiAB1lkWmNe9vRNsZ+YPoyQc4E/HxeE8OHYCt/1Ygs4yzu6Ys1QP/66NmkPfIYtj7v11dVWOGBzffnM+yKovEY4OFsd5B3zd0bF0zrg+i2PiJHjKmsGJgsHRzOB4z+A4DAZP2Z2m2F1ifOPsLn5zizcpeNgZHL9wG08yOHoFQymHw350wZrDxVEUx4XDcXFkV9iPl6BTjAOjOYHGMM7ggEbwglbQi/BVLbP5Or25W1tbVwf+eG+Sedi/MK7yd8Y2YJibv+wVxwEAMDgGgTWcnYHgcPGZATl/CCBcgDih8B3CvZOgB3A4dhkc8GSf5oA96KCD9e2aa+t2dpktc6+xu4nE4njVOwEFwz7AASSMA0YHBsd5c8fFcfAMMBiHfsFCmPsDWsohoFA/F4Q7W0JTWGRwQJ8AafQf0BzqYP99cJ/prRc6s7lJzhax16UoDpbJ2TwcM6FLCOIYj+Ggj4BDLLQcAxz1n2GS7xCaxB9wmDmFFOYWW1AczMansNwLHdwyeBhgG9XV6bz0e7/ZrNu+QRuHQxy9MXE4JgRxwLAAcfg+XzjGGxWD0B0O4UABcAAGDI4T6Br1i31w39PaWjPEweygzODY9NeZwUtaYR/T1ZkXFfZnTWad/wYFD/tRdMSMO8sEM2KK4oDWcDIOouX5/O9MdICd8THh4RPEsQldoxbMNTdBcIjhqIviOAY4zE1vAA4/cJOdreCzJp3uJnkLi+PyywIU3LSFweEQtA4YIBjnOIIc6tl5Qx0TQAGOWhYHszkwDA+bcNd1FofZbGZx/FEMXjaNKhTfm3VA/mL4d9OYjA2Vr0n2U+Aak0fIQDsBp1JLgtbRzOLwfeZ276yvHbdDHHAGscOAAY5hbnrP4DAzOIIQRxPEMboLjEFXvKWgh3WIvDdnbLHD3WsuzrZoRuCWc56ZUi/N9zGKTZFg4jnTe4CDGTlZFkC7viiOuk8+uvEPHYwOXhAd3wB3MLM44PixY6ftz/xRY/BtQ7toamrSFUPdHG9hcHQ4zk6hjsAsgsXhYG9Ba3+PZjv+dHrI3mKcApM3Aw7ju0Ds5tA06B4MD+ZPn3brIAMdvNwoDmgTz54x/+r8wFe2IAS/F8gPXjTtfEwhAUwAB3t3tQRuKprBfGGevcNgr37d72wuQAB0HB7ZDSroQzB72N0cHR3dZCB4WRyw88UMguIdeI//hul8HIeuGPQcWIR/B0SYHxmbADV8eAZfbY+mEgEq+6kD0UUcBwukNjYG/lEX3SwcdGZrFwycizBs2rdhfNiFxs/QYNRUzMzCFW+gP/g56yhmmYyBUGMfAwy8zM3wJjQP/2Kquk/K/gLu0FoftQbGOpBt0pt+Z3PRICSA4GA2P4Nh0G+G4RBqk+nyJsDBBgEgs/8De8v6I9NREF6D29Ekv7/Y+wZC2IKvxphco9vgcNNYSwq6LiT7zlxUkAbEYeZw1MVwKF4UM37xDFg1vQtioJd9itNYDMIhuM6+7SY4ZoCXY2++jxZ5U9xU3MTg8DaxOLZ33rCbWnwAKd4fo+cHiU3bN2aotTeiookD8ZHF3uj76LMzFxEejz3CYnPBZEZ2O3eZW9gDCiQxXhtSA8hmb7xhT0zvda973etet0j/D/O2aDFQyqVMAAAAAElFTkSuQmCC", 'JPEG', 10, 10, 15, 15)
            a=a+80;
            doc.addImage("https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=aaa", 'JPEG', pageWidth/2-35, pageHeight/2-60, 50, 60)
            doc.text(data.name,pageWidth/2-10,pageHeight/2+10,'center')
            doc.text(data.bloc.name,pageWidth/2-10,pageHeight/2+20,'center')
            doc.addPage();
        });

        doc.save('a4.pdf');
    }
    return (
        <>
        <div className="content">
            <Col md="12">
                <Card>
                <div className="crud  p-3 mb-5 mt-5 bg-body rounded">
                    <div className="row ">
                        <div className=" center col-sm-5 offset-sm-4 text-gred" style={{color: "blue"}}><h2><b>Salle Details</b></h2></div>
                    </div>
                    <div class="row ">

                        <div class="col-sm-3 mt-5 mb-4 text-gred">
                            <div className="search">
                                <form class="form-inline">
                                    <input class="form-control mr-sm-2" type="search" placeholder="Search Salle" aria-label="Search"/>

                                </form>
                            </div>
                        </div>
                        <div class="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{color:"green"}}>
                            <Button onClick={print}>
                                Imprimer
                            </Button>
                        </div>
                        <div class="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
                            <Button variant="primary" onClick={handleShow}>
                                Add New Salle
                            </Button>
                        </div>
                    </div>
                    <div class="row">
                        <div className="table-responsive">
                            <table className="table">
                                <thead className="thead-light">
                                <tr>
                                    <th>#</th>
                                    <th>name</th>
                                    <th>Type</th>
                                    <th>bloc</th>
                                    <th>&ensp;&ensp;&ensp;&ensp;QR Code</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {APIData.map((data, key) => {
                                    return (
                                        <tr>
                                            <td>{key}</td>
                                            <td>{data.name}</td>
                                            <td>{data.type}</td>
                                            <td >{data.bloc.name}</td>
                                            <td><QRCode value={data._id} /></td>
                                            <td>
                                                <a className="edit" title="Edit" data-toggle="tooltip" onClick={() =>print2(data.name,data.bloc.name)}><i
                                                    className="material-icons" >&#xE254;</i></a>
                                                <a className="delete" title="Delete" data-toggle="tooltip" ><i
                                                    className="material-icons" >&#xE872;</i></a>
                                            </td>
                                        </tr>

                                    );
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* <!--- Model Box ---> */}
                    <div className="model_box">
                        <Modal
                            show={show}
                            onHide={handleClose}
                            backdrop="static"
                            keyboard={false}
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>Add Record</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Salle name</label>
                                        <input type="text" className="form-control"  placeholder=' Name' onChange={(e) => setName(e.target.value)}
                                               id="name"
                                               name="name"
                                                />

                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Salle Type</label>
                                        <input type="text" className="form-control"   onChange={(e) => settype(e.target.value)}
                                               id="type"
                                               name="type"
                                               placeholder="type"
                                        />

                                    </div>
                                    <div className="mb-3">
                                        <label for="exampleFormControlSelect1">Bloc</label>
                                        <select class="form-control"  id="bloc" onChange={(e) => onDelete(e.target.value)}>

                                            {APIbloc.map((data, key) => {
                                                return (
                                                    <option value={data._id} >{data.name}</option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                    <button type="submit" className="btn btn-primary" onClick={ postData}>Submit</button>
                                </form>

                            </Modal.Body>

                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>

                            </Modal.Footer>
                        </Modal>

                        {/* Model Box Finsihs */}
                    </div>
                </div>
                </Card>
            </Col>
        </div>
        </>

    );
}

export default Salle;