<!doctype html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>{% block title %}{% endblock %}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="css/main.css" />
</head>
<body>
    <div class="t-site">
        <div class="t-page">
            {% block structure %}{% endblock %}
        </div>
    </div>
    {# <script src="js/vendor/jquery.js"></script> #}
    <script src="js/main.js"></script>
    <script>
        console.log( 'base' );
        {% block javascript %}{% endblock %}
    </script>
</body>
</html>
