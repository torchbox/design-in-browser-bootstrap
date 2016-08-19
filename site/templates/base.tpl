<!doctype html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>{% block title %}{% endblock %}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="css/main.css" />
</head>
<body>
    <div class="site">
        <div class="page">
            {% include "structure.tpl" %}
        </div>
    </div>
    {# <script src="js/vendor/jquery.js"></script> #}
    <script src="js/main.js"></script>
    <script>
        {% block javascript %}{% endblock %}
    </script>
</body>
</html>
